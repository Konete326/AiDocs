const AIService = require('./AIService');
const Project = require('../models/Project');
const Document = require('../models/Document');
const AppError = require('../utils/AppError');

exports.sendChatMessage = async (projectId, userId, messages) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const docs = await Document.find({ projectId, userId });

  const docsContext = docs.map(d =>
    `=== ${d.docType.toUpperCase()} ===\n${d.content}`
  ).join('\n\n');

  const systemPrompt = `You are an AI Co-founder assistant for the project "${project.title}".
You have access to the complete technical documentation for this project.
Answer questions specifically about this project using the documentation below.
Be concise, practical, and actionable.

PROJECT DOCUMENTATION:
${docsContext.slice(0, 8000)}`;

  const aiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  return await AIService.generateChat(aiMessages);
};
