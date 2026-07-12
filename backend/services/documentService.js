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

const generateFolderStructureLocal = (wizardAnswers) => {
  const projectType = wizardAnswers?.projectType || 'other';
  const title = wizardAnswers?.projectName || 'Project';
  
  let structure = '';
  if (projectType === 'mobile') {
    structure = `
├── android/             # Android native configuration
├── ios/                 # iOS native configuration
├── lib/                 # Core Flutter source code
│   ├── main.dart        # Application entry point
│   ├── models/          # Data models
│   ├── screens/         # UI screens / views
│   ├── services/        # API and background services
│   └── widgets/         # Reusable UI components
├── pubspec.yaml         # Dependencies and metadata
└── README.md
`;
  } else if (projectType === 'ai') {
    structure = `
├── app/                 # Main application package
│   ├── __init__.py
│   ├── main.py          # FastAPI application entry point
│   ├── config.py        # Settings and environment loaders
│   ├── core/            # LLM prompts, chains, and agents
│   ├── api/             # API routes and endpoints
│   └── models/          # Pydantic schemas and database models
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
└── README.md
`;
  } else {
    structure = `
├── backend/             # Node.js Express server
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # Express endpoints
│   │   ├── middleware/  # Auth & validation middleware
│   │   └── server.js    # Entry point
│   ├── package.json
│   └── .env.example
├── frontend/            # React + Vite client
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page views
│   │   ├── services/    # API endpoints integration
│   │   └── App.jsx      # Root component
│   ├── package.json
│   └── index.html
└── README.md
`;
  }
  
  return `# Recommended Folder Structure — ${title}

Based on your project type (${projectType.toUpperCase()}), we recommend the following directory layout:

\`\`\`text
${structure}
\`\`\`

## Guidelines
*   **Separation of Concerns:** Keep business logic separated from presentation layers.
*   **Config Files:** Store all secrets in \`.env\` files. Never commit credentials to version control.
*   **Modular Code:** Build components and backend controllers in separate modules to ensure codebase remains scalable.`;
};

const generateClaudeContextLocal = (wizardAnswers, contextSummary) => {
  const title = wizardAnswers?.projectName || 'Project';
  const projectType = wizardAnswers?.projectType || 'other';
  const techPreferences = wizardAnswers?.techPreferences || 'Not specified';
  const problemStatement = wizardAnswers?.problemStatement || 'Not specified';
  
  return `# CLAUDE.md (AI Context Guide) — ${title}

## Project Overview
*   **Type:** ${projectType.toUpperCase()}
*   **Problem Statement:** ${problemStatement}
*   **Tech Preferences:** ${techPreferences}

## Development Guidelines
*   **Code Style:** Keep code modular, self-contained, and clean. Do not add comments unless explicitly asked.
*   **Error Handling:** Always validate inputs and handle errors gracefully using appropriate exception classes.
*   **Dependencies:** Check package.json before installing packages. Always prefer npm/npx for setup.

## Key Build & Test Commands
*   **Install Dependencies:** \`npm install\`
*   **Start Dev Server:** \`npm run dev\`
*   **Build Project:** \`npm run build\`
*   **Run Linter:** \`npx eslint .\`

## Project Structure Summary
See \`FolderStructure.md\` for a complete blueprint of directories and configuration files.`;
};

const PIPELINE = [
  { parallel: false, types: ['prd'] },
  { parallel: true,  types: ['srd', 'techStack', 'dbSchema', 'userFlows', 'mvpPlan'] }
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

    const localDocs = ['folderStructure', 'claudeContext', 'agentSystemPrompt'];
    for (const docType of localDocs) {
      if (!alreadyDone.has(docType)) {
        let content = '';
        const contextString = buildContext(generatedSoFar);
        
        if (docType === 'folderStructure') {
          content = generateFolderStructureLocal(project.wizardAnswers);
        } else if (docType === 'claudeContext') {
          content = generateClaudeContextLocal(project.wizardAnswers, contextString);
        } else if (docType === 'agentSystemPrompt') {
          const agentPromptTemplate = prompts.agentSystemPrompt;
          content = agentPromptTemplate(project.wizardAnswers, contextString);
        }
        
        await Document.findOneAndUpdate(
          { projectId: project._id, docType },
          { userId, content, modelUsed: 'LOCAL_TEMPLATE', generationTimeMs: 0, contentTokenCount: Math.floor(content.length / 4), $inc: { version: 1 } },
          { upsert: true, new: true }
        );
        
        await Project.findByIdAndUpdate(project._id, {
          $addToSet: { docsGenerated: docType }
        });
        
        generatedSoFar[docType] = content;
        alreadyDone.add(docType);
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

exports.generateNext = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project || project.status !== 'generating') return;

  const existingDocs = await Document.find({ projectId });
  const generatedSoFar = {};
  const alreadyDone = new Set();

  for (const doc of existingDocs) {
    if (doc.content) {
      generatedSoFar[doc.docType] = doc.content;
      alreadyDone.add(doc.docType);
    }
  }

  const allDocs = ['prd', 'srd', 'techStack', 'dbSchema', 'userFlows', 'mvpPlan', 'folderStructure', 'claudeContext', 'agentSystemPrompt'];
  const nextDocType = allDocs.find(t => !alreadyDone.has(t));

  if (!nextDocType) {
    await Project.findByIdAndUpdate(projectId, { status: 'complete' });
    const notificationService = require('./notificationService');
    await notificationService.createNotification(
      userId,
      'doc_ready',
      'Documents Ready',
      'Your AI document suite has been fully generated.',
      { projectId }
    );
    return;
  }

  try {
    let content = '';
    const contextString = buildContext(generatedSoFar);

    if (['prd', 'srd', 'techStack', 'dbSchema', 'userFlows', 'mvpPlan'].includes(nextDocType)) {
      content = await generateOne(nextDocType, project, userId, generatedSoFar);
    } else {
      if (nextDocType === 'folderStructure') {
        content = generateFolderStructureLocal(project.wizardAnswers);
      } else if (nextDocType === 'claudeContext') {
        content = generateClaudeContextLocal(project.wizardAnswers, contextString);
      } else if (nextDocType === 'agentSystemPrompt') {
        const agentPromptTemplate = prompts.agentSystemPrompt;
        content = agentPromptTemplate(project.wizardAnswers, contextString);
      }

      await Document.findOneAndUpdate(
        { projectId, docType: nextDocType },
        { userId, content, modelUsed: 'LOCAL_TEMPLATE', generationTimeMs: 0, contentTokenCount: Math.floor(content.length / 4), $inc: { version: 1 } },
        { upsert: true, new: true }
      );

      await Project.findByIdAndUpdate(project._id, {
        $addToSet: { docsGenerated: nextDocType }
      });
    }

    const updatedAlreadyDone = new Set(alreadyDone);
    updatedAlreadyDone.add(nextDocType);
    const remaining = allDocs.find(t => !updatedAlreadyDone.has(t));

    if (!remaining) {
      await Project.findByIdAndUpdate(projectId, { status: 'complete' });
      const notificationService = require('./notificationService');
      await notificationService.createNotification(
        userId,
        'doc_ready',
        'Documents Ready',
        'Your AI document suite has been fully generated.',
        { projectId }
      );
    }
  } catch (error) {
    console.error(`[generateNext] failed for ${nextDocType}:`, error);
  }
};
