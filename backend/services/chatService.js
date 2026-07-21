const AIService = require('./AIService');
const Project = require('../models/Project');
const Document = require('../models/Document');
const AppError = require('../utils/AppError');
const { getAllAvailableSkills } = require('../controllers/skillsController');

const VALID_DOC_TYPES = [
  'prd', 'srd', 'techStack', 'dbSchema', 'userFlows',
  'mvpPlan', 'folderStructure', 'claudeContext', 'agentSystemPrompt', 'skills', 'rules'
];

exports.sendChatMessage = async (projectId, userId, messages) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const docs = await Document.find({ projectId, userId });
  const allSkills = await getAllAvailableSkills();

  const docsContext = docs.map(d =>
    `=== ${d.docType.toUpperCase()} ===\n${d.content}`
  ).join('\n\n');

  // Compute active skills for this project
  const activeSkillIds = allSkills
    .filter(s => {
      if (project.disabledSkills && project.disabledSkills.includes(s.id)) return false;
      return (
        s.forTypes.includes('all') ||
        s.forTypes.includes(project.projectType) ||
        (project.customSkills && project.customSkills.includes(s.id))
      );
    })
    .map(s => `${s.name} (${s.id})`);

  const availableSkillSummary = allSkills.map(s => `- ${s.name} (id: "${s.id}"): ${s.description}`).join('\n');

  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content.toLowerCase() || '';

  const systemPrompt = `You are an AI Co-founder assistant for the project "${project.title}".
You have access to the complete technical documentation for this project.
You can answer questions, EDIT/UPDATE any document, DOWNLOAD/EXPORT files, AND ADD/REMOVE project skills.

CURRENT PROJECT SKILLS:
${activeSkillIds.join(', ') || 'None'}

AVAILABLE SYSTEM SKILLS LIBRARY:
${availableSkillSummary}

SKILLS MANAGEMENT INSTRUCTIONS:
If the user asks to add, enable, remove, or disable a skill for this project:
1. Confirm the action in your text response.
2. Output a skill tag at the end of your response:
[SKILL_ACTION:add:skillId] or [SKILL_ACTION:remove:skillId]

DOCUMENT EDITING INSTRUCTIONS:
If the user asks to edit, update, modify, or rewrite any project document:
1. Explain the changes.
2. Output:
[UPDATE_DOC:docType]
<complete updated document content in markdown>
[/UPDATE_DOC]

FILE DOWNLOAD & EXPORT INSTRUCTIONS:
If the user asks to download or export files (all files / zip / specific file / Word / Excel / PDF):
Output a download action tag at the end of your response:
[DOWNLOAD_ACTION:format:docType]

Supported formats: zip, word, excel, pdf
Supported docTypes: all, prd, srd, techStack, dbSchema, userFlows, mvpPlan, folderStructure, claudeContext, agentSystemPrompt, skills, rules.

PROJECT DOCUMENTATION:
${docsContext.slice(0, 10000)}`;

  const aiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  let rawReply = await AIService.generateChat(aiMessages);

  // 1. Process Document Update Tags
  const updateMatch = rawReply.match(/\[UPDATE_DOC:([a-zA-Z]+)\]\s*([\s\S]*?)\s*\[\/UPDATE_DOC\]/);
  if (updateMatch) {
    const docTypeCandidate = updateMatch[1].toLowerCase();
    const newContent = updateMatch[2].trim();
    const matchedType = VALID_DOC_TYPES.find(t => t.toLowerCase() === docTypeCandidate);

    if (matchedType && newContent) {
      const existingDoc = await Document.findOne({ projectId, userId, docType: matchedType });
      const currentVersion = existingDoc ? (existingDoc.version || 1) + 1 : 1;

      await Document.findOneAndUpdate(
        { projectId, userId, docType: matchedType },
        { content: newContent, version: currentVersion },
        { new: true, upsert: true }
      );
      rawReply = rawReply.replace(/\[UPDATE_DOC:[a-zA-Z]+\]\s*[\s\S]*?\s*\[\/UPDATE_DOC\]/g, '').trim();
      rawReply += `\n\n✅ **Updated Document:** ${matchedType.toUpperCase()} has been saved directly to your project!`;
    }
  }

  // 2. Process Skill Action Tags
  const skillMatch = rawReply.match(/\[SKILL_ACTION:(add|remove):([a-zA-Z0-9_-]+)\]/);
  if (skillMatch) {
    const action = skillMatch[1];
    const skillId = skillMatch[2];

    const targetSkill = allSkills.find(s => s.id === skillId || s.id.toLowerCase() === skillId.toLowerCase());
    if (targetSkill) {
      if (!project.customSkills) project.customSkills = [];
      if (!project.disabledSkills) project.disabledSkills = [];

      if (action === 'add') {
        if (!project.customSkills.includes(targetSkill.id)) {
          project.customSkills.push(targetSkill.id);
        }
        project.disabledSkills = project.disabledSkills.filter(id => id !== targetSkill.id);
      } else if (action === 'remove') {
        project.customSkills = project.customSkills.filter(id => id !== targetSkill.id);
        if (!project.disabledSkills.includes(targetSkill.id)) {
          project.disabledSkills.push(targetSkill.id);
        }
      }
      await project.save();
      rawReply = rawReply.replace(/\[SKILL_ACTION:(add|remove):[a-zA-Z0-9_-]+\]/g, '').trim();
      rawReply += `\n\n⚡ **Skill Updated:** ${action === 'add' ? 'Added' : 'Removed'} skill **"${targetSkill.name}"** for your project!`;
    }
  } else {
    // Fallback Skill Action detection if user requested skill add/remove
    if (lastUserMsg.includes('add skill') || lastUserMsg.includes('skills add') || (lastUserMsg.includes('add ') && lastUserMsg.includes('skill'))) {
      const foundSkill = allSkills.find(s => lastUserMsg.includes(s.id.toLowerCase()) || lastUserMsg.includes(s.name.toLowerCase()));
      if (foundSkill) {
        if (!project.customSkills) project.customSkills = [];
        if (!project.customSkills.includes(foundSkill.id)) {
          project.customSkills.push(foundSkill.id);
          await project.save();
          rawReply += `\n\n⚡ **Skill Added:** Successfully added **"${foundSkill.name}"** to your project!`;
        }
      }
    } else if (lastUserMsg.includes('remove skill') || lastUserMsg.includes('delete skill') || (lastUserMsg.includes('remove ') && lastUserMsg.includes('skill'))) {
      const foundSkill = allSkills.find(s => lastUserMsg.includes(s.id.toLowerCase()) || lastUserMsg.includes(s.name.toLowerCase()));
      if (foundSkill) {
        if (!project.customSkills) project.customSkills = [];
        if (!project.disabledSkills) project.disabledSkills = [];
        project.customSkills = project.customSkills.filter(id => id !== foundSkill.id);
        if (!project.disabledSkills.includes(foundSkill.id)) {
          project.disabledSkills.push(foundSkill.id);
        }
        await project.save();
        rawReply += `\n\n⚡ **Skill Removed:** Successfully removed **"${foundSkill.name}"** from your project!`;
      }
    }
  }

  // 3. Fallback Download Tag Detection
  if (!rawReply.includes('[DOWNLOAD_ACTION:')) {
    if (lastUserMsg.includes('pdf')) {
      const targetDoc = VALID_DOC_TYPES.find(t => lastUserMsg.includes(t.toLowerCase())) || 'prd';
      rawReply += `\n\n[DOWNLOAD_ACTION:pdf:${targetDoc}]`;
    } else if (lastUserMsg.includes('poora') || lastUserMsg.includes('all file') || lastUserMsg.includes('zip') || lastUserMsg.includes('everything')) {
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
