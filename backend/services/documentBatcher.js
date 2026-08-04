const Document = require('../models/Document');
const Project = require('../models/Project');
const AIService = require('./AIService');

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

const buildContext = (previousDocs) => {
  const entries = Object.entries(previousDocs);
  if (entries.length === 0) return 'None yet.';
  return entries
    .map(([type, content]) => `### ${type.toUpperCase()}\n${content.substring(0, 1500)}${content.length > 1500 ? '\n...[truncated]' : ''}`)
    .join('\n\n---\n\n');
};

async function generateSingleDoc(docType, project, userId, generatedSoFar) {
  const startTime = Date.now();
  const contextString = buildContext(generatedSoFar);
  let promptText = prompts[docType](project.wizardAnswers, contextString);
  if (project.designSystem && project.designSystem.prompt) {
    promptText += `\n\n### MANDATORY DESIGN SYSTEM GUIDELINES\n${project.designSystem.prompt}`;
  }

  const { content, modelUsed, generationTimeMs } = await AIService.generateText(promptText, docType, 2048);
  const contentTokenCount = Math.floor(content.length / 4);

  await Document.findOneAndUpdate(
    { projectId: project._id, docType },
    { userId, content, modelUsed, generationTimeMs, contentTokenCount, $inc: { version: 1 } },
    { upsert: true, new: true }
  );

  await Project.findByIdAndUpdate(project._id, {
    generationLock: new Date(),
    $addToSet: { docsGenerated: docType }
  });

  const durationMs = Date.now() - startTime;
  console.log(`[HighSpeedEngine] ${docType} generated in ${durationMs}ms via ${modelUsed}`);

  return { docType, content };
}

async function executeParallelBatch(docTypes, project, userId, generatedSoFar) {
  const tasks = docTypes.map(docType => generateSingleDoc(docType, project, userId, generatedSoFar).catch(err => {
    console.warn(`[HighSpeedEngine] ${docType} batch attempt failed: ${err.message}`);
    return generateSingleDoc(docType, project, userId, generatedSoFar);
  }));

  const results = await Promise.allSettled(tasks);
  const successful = {};

  results.forEach(res => {
    if (res.status === 'fulfilled' && res.value) {
      successful[res.value.docType] = res.value.content;
    }
  });

  return successful;
}

module.exports = {
  buildContext,
  generateSingleDoc,
  executeParallelBatch
};
