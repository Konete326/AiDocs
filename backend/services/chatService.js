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

  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content.toLowerCase() || '';

  const systemPrompt = `You are an AI Co-founder assistant for the project "${project.title}".
You have access to the complete technical documentation for this project.
You can answer questions, EDIT/UPDATE any document, AND DOWNLOAD/EXPORT files when requested by the user.

DOCUMENT EDITING INSTRUCTIONS:
If the user asks you to edit, update, modify, add to, or rewrite any project document (such as PRD, SRD, Tech Stack, Database Schema, User Flows, MVP Plan, Folder Structure, Claude Context, Agent System Prompt, Skills, or Rules):
1. Explain what changes you are making in your response.
2. Output:
[UPDATE_DOC:docType]
<complete updated document content in markdown>
[/UPDATE_DOC]

FILE DOWNLOAD & EXPORT INSTRUCTIONS:
If the user asks to download or export files (all files / zip / specific file / Word .docx / Excel .csv / PDF):
Output a download action tag at the end of your response:
[DOWNLOAD_ACTION:format:docType]

Supported Formats:
- zip (download all project documents in a ZIP package)
- word (download as Word .docx)
- excel (download as Excel .csv)
- pdf (download / view PDF)

Supported docType values: all, prd, srd, techStack, dbSchema, userFlows, mvpPlan, folderStructure, claudeContext, agentSystemPrompt, skills, rules.

Examples:
- User: "poora file download krdo" / "download all files" -> Output: [DOWNLOAD_ACTION:zip:all]
- User: "prd word main download krdo" -> Output: [DOWNLOAD_ACTION:word:prd]
- User: "db schema excel main download krdo" -> Output: [DOWNLOAD_ACTION:excel:dbSchema]
- User: "tech stack pdf download krdo" -> Output: [DOWNLOAD_ACTION:pdf:techStack]

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

  // Fallback pattern detection if user explicitly requested download but AI forgot [DOWNLOAD_ACTION:...]
  if (!rawReply.includes('[DOWNLOAD_ACTION:')) {
    if (lastUserMsg.includes('poora') || lastUserMsg.includes('all file') || lastUserMsg.includes('zip') || lastUserMsg.includes('everything')) {
      rawReply += `\n\n[DOWNLOAD_ACTION:zip:all]`;
    } else if (lastUserMsg.includes('excel') || lastUserMsg.includes('csv') || lastUserMsg.includes('sheet')) {
      const targetDoc = VALID_DOC_TYPES.find(t => lastUserMsg.includes(t.toLowerCase())) || 'dbSchema';
      rawReply += `\n\n[DOWNLOAD_ACTION:excel:${targetDoc}]`;
    } else if (lastUserMsg.includes('word') || lastUserMsg.includes('docx')) {
      const targetDoc = VALID_DOC_TYPES.find(t => lastUserMsg.includes(t.toLowerCase())) || 'prd';
      rawReply += `\n\n[DOWNLOAD_ACTION:word:${targetDoc}]`;
    } else if (lastUserMsg.includes('download') || lastUserMsg.includes('downlaod') || lastUserMsg.includes('export')) {
      const targetDoc = VALID_DOC_TYPES.find(t => lastUserMsg.includes(t.toLowerCase()));
      if (targetDoc) {
        rawReply += `\n\n[DOWNLOAD_ACTION:word:${targetDoc}]`;
      }
    }
  }

  return rawReply;
};
