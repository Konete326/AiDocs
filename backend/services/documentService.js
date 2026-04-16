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

const dependencyOrder = [
  'prd', 'srd', 'techStack', 'dbSchema', 'userFlows', 'mvpPlan', 'folderStructure', 'claudeContext', 'agentSystemPrompt'
];

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
    for (const docType of dependencyOrder) {
      // Skip docs that have already been successfully generated
      if (alreadyDone.has(docType)) {
        continue;
      }

      const promptText = prompts[docType](project.wizardAnswers, generatedSoFar);
      
      const { content, modelUsed, generationTimeMs } = await AIService.generateText(promptText, docType);
      
      const contentTokenCount = Math.floor(content.length / 4);
      
      await Document.findOneAndUpdate(
        { projectId, docType },
        {
          userId,
          content,
          modelUsed,
          generationTimeMs,
          contentTokenCount,
          $inc: { version: 1 }
        },
        { upsert: true, new: true }
      );

      generatedSoFar[docType] = content;
      
      if (!project.docsGenerated.includes(docType)) {
        project.docsGenerated.push(docType);
      }
      await project.save();
    }

    project.status = 'complete';
    await project.save();
    
    const notificationService = require('./notificationService');
    await notificationService.createNotification(
      userId,
      'doc_ready',
      'Documents Ready',
      'Your AI document suite has been fully generated.',
      { projectId }
    );

  } catch (error) {
    project.status = 'error';
    await project.save();
    
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
