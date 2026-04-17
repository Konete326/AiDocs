const Document = require('../models/Document');
const Project = require('../models/Project');
const AIService = require('./AIService');
const AppError = require('../utils/AppError');

const prompts = {
  prd: require('../prompts/prdPrompt'),
  srd: require('../prompts/srdPrompt'),
  techStack: require('../prompts/techStackPrompt'),
  dbSchema: require('../prompts/dbSchemaPrompt'),
  userFlows: require('../prompts/userFlowsPrompt'),
  mvpPlan: require('../prompts/mvpPlanPrompt'),
  folderStructure: require('../prompts/folderStructurePrompt'),
  claudeContext: require('../prompts/claudeContextPrompt'),
  agentSystemPrompt: require('../prompts/agentSystemPrompt')
};

/**
 * Build a concise context string from previously generated documents.
 * Truncates each to 1500 chars to avoid blowing the LLM context window.
 */
const buildContext = (previousDocs) => {
  const entries = Object.entries(previousDocs);
  if (entries.length === 0) return 'None yet.';
  return entries
    .map(([type, content]) => `### ${type.toUpperCase()}\n${content.substring(0, 1500)}${content.length > 1500 ? '\n...[truncated]' : ''}`)
    .join('\n\n---\n\n');
};

/**
 * Generation pipeline — balanced for speed + rate-limit safety:
 *   Group 1: PRD first (backbone of the project, must be sequential)
 *   Group 2: Core specs in parallel (max 3)
 *   Group 3: Design/flow docs in parallel (max 3)
 *   Group 4: Remaining docs sequential (context-heavy, needs prior context)
 */
const PIPELINE = [
  { parallel: false, types: ['prd'] },
  { parallel: true,  types: ['srd', 'techStack', 'dbSchema'] },
  { parallel: true,  types: ['userFlows', 'folderStructure', 'mvpPlan'] },
  { parallel: false, types: ['claudeContext', 'agentSystemPrompt'] },
];

// Helper: generate a single doc, save it, update project.docsGenerated
const generateOne = async (docType, project, userId, generatedSoFar) => {
  const contextString = buildContext(generatedSoFar);
  const promptText = prompts[docType](project.wizardAnswers, contextString);
  
  // Use max_tokens=2048 for faster generation as per performance optimization plan
  const { content, modelUsed, generationTimeMs } = await AIService.generateText(promptText, docType, 2048);
  const contentTokenCount = Math.floor(content.length / 4);

  await Document.findOneAndUpdate(
    { projectId: project._id, docType },
    { userId, content, modelUsed, generationTimeMs, contentTokenCount, $inc: { version: 1 } },
    { upsert: true, new: true }
  );

  // Atomically push to docsGenerated (safe for parallel calls)
  await Project.findByIdAndUpdate(project._id, {
    $addToSet: { docsGenerated: docType }
  });

  return content;
};

exports.generateAll = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project || project.status === 'error') return;

  // Load already-generated docs from DB to build context and skip re-generation
  const existingDocs = await Document.find({ projectId });
  const generatedSoFar = {};
  const alreadyDone = new Set();

  for (const doc of existingDocs) {
    if (doc.content) {
      generatedSoFar[doc.docType] = doc.content;
      alreadyDone.add(doc.docType);
    }
  }

  try {
    for (const group of PIPELINE) {
      const pending = group.types.filter(t => !alreadyDone.has(t));
      if (pending.length === 0) continue; // Whole group already done

      if (group.parallel) {
        // Run all pending types in this group concurrently
        // Use allSettled so one doc failure doesn't kill the entire group
        const results = await Promise.allSettled(
          pending.map(async (docType) => {
            const content = await generateOne(docType, project, userId, generatedSoFar);
            return { docType, content };
          })
        );

        const failed = results.filter(r => r.status === 'rejected');
        if (failed.length > 0) {
          console.error(`[generateAll] ${failed.length}/${pending.length} docs failed in parallel group:`,
            failed.map(f => f.reason?.message));
        }

        // Merge only successful results into context for next groups
        for (const r of results) {
          if (r.status === 'fulfilled') {
            const { docType, content } = r.value;
            generatedSoFar[docType] = content;
            alreadyDone.add(docType);
          }
        }
      } else {
        // Sequential within the group
        for (const docType of pending) {
          const content = await generateOne(docType, project, userId, generatedSoFar);
          generatedSoFar[docType] = content;
          alreadyDone.add(docType);
        }
      }
    }

    await Project.findByIdAndUpdate(project._id, { status: 'complete' });

    const notificationService = require('./notificationService');
    await notificationService.createNotification(
      userId,
      'doc_ready',
      'Documents Ready',
      'Your AI document suite has been fully generated.',
      { projectId }
    );

  } catch (error) {
    await Project.findByIdAndUpdate(project._id, { status: 'error' });

    const notificationService = require('./notificationService');
    await notificationService.createNotification(
      userId,
      'generation_failed',
      'Generation Failed',
      error.message || 'The AI generator encountered a fatal error.',
      { projectId }
    );

    throw new AppError('Generation failed: ' + error.message, 500, 'GENERATION_FAILED');
  }
};

exports.getDocumentsByProject = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  return await Document.find({ projectId }).sort({ createdAt: 1 });
};

exports.getSingleDocument = async (projectId, docType, userId) => {
  const doc = await Document.findOne({ projectId, docType, userId });
  if (!doc) throw new AppError('Document not found', 404, 'NOT_FOUND');
  return doc;
};

exports.updateDocument = async (projectId, docType, userId, updatedContent) => {
  const doc = await Document.findOneAndUpdate(
    { projectId, docType, userId },
    { content: updatedContent, $inc: { version: 1 } },
    { new: true }
  );
  if (!doc) throw new AppError('Document not found', 404, 'NOT_FOUND');
  return doc;
};
