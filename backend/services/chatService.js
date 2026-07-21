const AIService = require('./AIService');
const Project = require('../models/Project');
const Document = require('../models/Document');
const AppError = require('../utils/AppError');

const VALID_DOC_TYPES = [
  'prd', 'srd', 'techStack', 'dbSchema', 'userFlows',
  'mvpPlan', 'folderStructure', 'claudeContext', 'agentSystemPrompt', 'skills', 'rules'
];

exports.sendChatMessage = async (projectId, userId, messages) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const docs = await Document.find({ projectId, userId });

  const docsContext = docs.map(d =>
    `=== ${d.docType.toUpperCase()} ===\n${d.content}`
  ).join('\n\n');

  const systemPrompt = `You are an AI Co-founder assistant for the project "${project.title}".
You have access to the complete technical documentation for this project.
You can answer questions and ALSO EDIT/UPDATE any document when requested by the user.

DOCUMENT EDITING INSTRUCTIONS:
If the user asks you to edit, update, modify, add to, or rewrite any project document (such as PRD, SRD, Tech Stack, Database Schema, User Flows, MVP Plan, Folder Structure, Claude Context, Agent System Prompt, Skills, or Rules):
1. Explain what changes you are making in your response.
2. At the end of your response, output the full updated document content wrapped inside a tag block like this:
[UPDATE_DOC:docType]
<complete updated document content in markdown>
[/UPDATE_DOC]

Valid docType values: prd, srd, techStack, dbSchema, userFlows, mvpPlan, folderStructure, claudeContext, agentSystemPrompt, skills, rules.

PROJECT DOCUMENTATION:
${docsContext.slice(0, 10000)}`;

  const aiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  let rawReply = await AIService.generateChat(aiMessages);

  // Check if AI generated a document update tag block
  const updateMatch = rawReply.match(/\[UPDATE_DOC:([a-zA-Z]+)\]\s*([\s\S]*?)\s*\[\/UPDATE_DOC\]/);

  let updatedDocType = null;

  if (updateMatch) {
    const docTypeCandidate = updateMatch[1].toLowerCase();
    const newContent = updateMatch[2].trim();

    const matchedType = VALID_DOC_TYPES.find(t => t.toLowerCase() === docTypeCandidate);

    if (matchedType && newContent) {
      updatedDocType = matchedType;
      const existingDoc = await Document.findOne({ projectId, userId, docType: matchedType });
      const currentVersion = existingDoc ? (existingDoc.version || 1) + 1 : 1;

      await Document.findOneAndUpdate(
        { projectId, userId, docType: matchedType },
        { content: newContent, version: currentVersion },
        { new: true, upsert: true }
      );
    }

    rawReply = rawReply.replace(/\[UPDATE_DOC:[a-zA-Z]+\]\s*[\s\S]*?\s*\[\/UPDATE_DOC\]/g, '').trim();
    if (updatedDocType) {
      rawReply += `\n\n✅ **Updated Document:** ${updatedDocType.toUpperCase()} has been saved directly to your project!`;
    }
  }

  return rawReply;
};
