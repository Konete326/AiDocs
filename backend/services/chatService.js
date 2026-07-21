const axios = require('axios');
const AIService = require('./AIService');
const Project = require('../models/Project');
const Document = require('../models/Document');
const AppError = require('../utils/AppError');
const { getAllAvailableSkills } = require('../controllers/skillsController');

const VALID_DOC_TYPES = [
  'prd', 'srd', 'techStack', 'dbSchema', 'userFlows',
  'mvpPlan', 'folderStructure', 'claudeContext', 'agentSystemPrompt', 'skills', 'rules'
];

const fetchWebsiteSummary = async (url) => {
  try {
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    const response = await axios.get(formattedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 7000
    });

    const html = response.data;
    if (typeof html !== 'string') return null;

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const description = metaMatch ? metaMatch[1].trim() : '';

    const cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      url: formattedUrl,
      title,
      description,
      textSnippet: cleanText.slice(0, 3000)
    };
  } catch (err) {
    return { url, title: '', description: '', textSnippet: 'Analyze based on URL name & domain context.' };
  }
};

exports.sendChatMessage = async (projectId, userId, messages) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const docs = await Document.find({ projectId, userId });
  const allSkills = await getAllAvailableSkills();

  const docsContext = docs.map(d =>
    `=== ${d.docType.toUpperCase()} ===\n${d.content}`
  ).join('\n\n');

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

  const lastUserMsgObj = [...messages].reverse().find(m => m.role === 'user');
  const lastUserMsg = lastUserMsgObj?.content || '';
  const lastUserMsgLower = lastUserMsg.toLowerCase();

  const urlRegex = /(https?:\/\/[^\s]+|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;
  const urlMatches = lastUserMsg.match(urlRegex);

  let websiteDataPrompt = '';
  if (urlMatches && urlMatches.length > 0) {
    const candidateUrl = urlMatches[0];
    if (!candidateUrl.includes('localhost') && candidateUrl.includes('.')) {
      const scraped = await fetchWebsiteSummary(candidateUrl);
      if (scraped) {
        websiteDataPrompt = `\n\n[COMPETITOR WEBSITE DATA FETCHED FROM ${scraped.url}]:
Title: ${scraped.title}
Description: ${scraped.description}
Text Snippet: ${scraped.textSnippet}`;
      }
    }
  }

  const systemPrompt = `You are an AI Co-founder assistant for the project "${project.title}".
You have access to the complete technical documentation for this project.

PERSONALITY & COMMUNICATION MANDATES:
1. FRIENDLY CO-FOUNDER TONE (Dosto ki tarah): Speak warmly, encouragingly, and collaboratively like a trusted technical co-founder friend.
2. NO UNNECESSARY JOKES (Mazak nahi karna): Be serious and professional about software architecture. Do NOT make silly jokes, frivolous banter, or waste the user's time.
3. TO-THE-POINT & WORK-FOCUSED (Sirf Kaam ki baat): Keep responses crisp, clinical, concise, and focused 100% on building the project. Avoid fluff, filler text, or verbose preambles.
4. MULTI-LINGUAL ADAPTATION: Match the user's language automatically (Roman Urdu, English, Urdu, Hindi, Hinglish, etc.). If the user speaks in Roman Urdu, respond in Roman Urdu!
5. PROACTIVE SHORT SUGGESTIONS: When the user asks about any feature, component, or tech stack, always include a short 1-2 sentence recommendation ("Aapko aisa karna chahiye... / Here is my suggestion...").

PROJECT OWNER & FOUNDER INFORMATION:
- Name: Sameer Akram
- GitHub: konete326
- Phone: 03213265524
- Email: sameerdevexpert@gmail.com

OWNER DISCLOSURE RULES:
1. If the user asks generally who owns/created/built this project or platform (e.g. "is project ka malik kon hai", "who is the owner", "founder info"), provide the full details (Name, GitHub, Phone, Email).
2. If the user asks specifically for ONE detail (e.g. ONLY GitHub, ONLY Phone, ONLY Email, ONLY Name), provide ONLY that specific detail. DO NOT list all details together.

COMPETITOR WEBSITE ANALYSIS INSTRUCTIONS:
If the user provides a website URL or asks to analyze a competitor website:
1. Provide a crisp, clinical, to-the-point analysis formatted cleanly in markdown:
   - **Core Features Identified**
   - **Advantages (Pros)**
   - **Disadvantages (Cons)**
   - **Strategic Recommendations for ${project.title}**
2. At the end of your analysis, ask the user:
   "Would you like me to update your PRD and SRD documentation to incorporate these features and competitive advantages?"

STRICT EMOJI RULE:
DO NOT use emoji icons anywhere in your text responses. Use clean Markdown formatting, clean headers, and standard bullet points only.

VISUAL FLOWCHART & DIAGRAM INSTRUCTIONS:
If the user asks for a flowchart, visual diagram, architecture schema, user flow, or competitor workflow (or asks to visualize anything):
Generate a valid Mermaid.js flowchart block using markdown code block.
Example format:
\`\`\`mermaid
graph TD
  A[User Visit] --> B[Authentication]
  B --> C[Dashboard]
\`\`\`

IMAGE ANALYSIS & VISION INSTRUCTIONS:
If the user attaches an image (e.g. wireframe, UI mockup, screenshot, flow diagram, photo, or food item):
1. Carefully inspect the visual details of the image using your vision capabilities.
2. Accurately describe what is shown in the image (e.g. if it is a food platter, UI screen, architecture diagram, etc.).
3. Explain how this image relates to or can be adapted for the project "${project.title}". If it is unrelated to software, describe what it is accurately and suggest how visual design/color themes/layouts from it could inspire the project if relevant.

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
    ...messages.map(m => {
      let attachmentText = '';
      const images = [];

      if (m.role === 'user' && Array.isArray(m.attachments) && m.attachments.length > 0) {
        attachmentText = m.attachments.map(att => {
          if (att.isImage) {
            if (att.dataUrl) {
              images.push({ dataUrl: att.dataUrl, type: att.type || 'image/png', name: att.name });
            }
            return `\n\n[USER ATTACHED IMAGE: "${att.name}"]\nPlease inspect and analyze the visual details of this attached image thoroughly.`;
          } else if (att.content) {
            return `\n\n[USER ATTACHED FILE: "${att.name}"]\nContent:\n${att.content.slice(0, 4000)}`;
          } else {
            return `\n\n[USER ATTACHED FILE: "${att.name}"]`;
          }
        }).join('\n');
      }
      return { role: m.role, content: `${m.content || ''}${attachmentText}`, images };
    })
  ];

  if (websiteDataPrompt) {
    aiMessages[aiMessages.length - 1].content += websiteDataPrompt;
  }

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
      rawReply += `\n\n**Updated Document:** ${matchedType.toUpperCase()} has been saved directly to your project!`;
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
      rawReply += `\n\n**Skill Updated:** ${action === 'add' ? 'Added' : 'Removed'} skill **"${targetSkill.name}"** for your project!`;
    }
  } else {
    if (lastUserMsgLower.includes('add skill') || lastUserMsgLower.includes('skills add') || (lastUserMsgLower.includes('add ') && lastUserMsgLower.includes('skill'))) {
      const foundSkill = allSkills.find(s => lastUserMsgLower.includes(s.id.toLowerCase()) || lastUserMsgLower.includes(s.name.toLowerCase()));
      if (foundSkill) {
        if (!project.customSkills) project.customSkills = [];
        if (!project.customSkills.includes(foundSkill.id)) {
          project.customSkills.push(foundSkill.id);
          await project.save();
          rawReply += `\n\n**Skill Added:** Successfully added **"${foundSkill.name}"** to your project!`;
        }
      }
    } else if (lastUserMsgLower.includes('remove skill') || lastUserMsgLower.includes('delete skill') || (lastUserMsgLower.includes('remove ') && lastUserMsgLower.includes('skill'))) {
      const foundSkill = allSkills.find(s => lastUserMsgLower.includes(s.id.toLowerCase()) || lastUserMsgLower.includes(s.name.toLowerCase()));
      if (foundSkill) {
        if (!project.customSkills) project.customSkills = [];
        if (!project.disabledSkills) project.disabledSkills = [];
        project.customSkills = project.customSkills.filter(id => id !== foundSkill.id);
        if (!project.disabledSkills.includes(foundSkill.id)) {
          project.disabledSkills.push(foundSkill.id);
        }
        await project.save();
        rawReply += `\n\n**Skill Removed:** Successfully removed **"${foundSkill.name}"** from your project!`;
      }
    }
  }

  // 3. Fallback Download Tag Detection
  if (!rawReply.includes('[DOWNLOAD_ACTION:')) {
    if (lastUserMsgLower.includes('pdf')) {
      const targetDoc = VALID_DOC_TYPES.find(t => lastUserMsgLower.includes(t.toLowerCase())) || 'prd';
      rawReply += `\n\n[DOWNLOAD_ACTION:pdf:${targetDoc}]`;
    } else if (lastUserMsgLower.includes('poora') || lastUserMsgLower.includes('all file') || lastUserMsgLower.includes('zip') || lastUserMsgLower.includes('everything')) {
      rawReply += `\n\n[DOWNLOAD_ACTION:zip:all]`;
    } else if (lastUserMsgLower.includes('excel') || lastUserMsgLower.includes('csv') || lastUserMsgLower.includes('sheet')) {
      const targetDoc = VALID_DOC_TYPES.find(t => lastUserMsgLower.includes(t.toLowerCase())) || 'dbSchema';
      rawReply += `\n\n[DOWNLOAD_ACTION:excel:${targetDoc}]`;
    } else if (lastUserMsgLower.includes('word') || lastUserMsgLower.includes('docx')) {
      const targetDoc = VALID_DOC_TYPES.find(t => lastUserMsgLower.includes(t.toLowerCase())) || 'prd';
      rawReply += `\n\n[DOWNLOAD_ACTION:word:${targetDoc}]`;
    } else if (lastUserMsgLower.includes('download') || lastUserMsgLower.includes('downlaod') || lastUserMsgLower.includes('export')) {
      const targetDoc = VALID_DOC_TYPES.find(t => lastUserMsgLower.includes(t.toLowerCase()));
      if (targetDoc) {
        rawReply += `\n\n[DOWNLOAD_ACTION:word:${targetDoc}]`;
      }
    }
  }

  // Persist new messages to chatHistory in MongoDB
  const lastUser = [...messages].reverse().find(m => m.role === 'user');
  if (lastUser) {
    if (!project.chatHistory) project.chatHistory = [];
    project.chatHistory.push({
      role: 'user',
      content: lastUser.content,
      attachments: lastUser.attachments || []
    });
    project.chatHistory.push({
      role: 'assistant',
      content: rawReply
    });
    await project.save();
  }

  return rawReply;
};

exports.getChatHistory = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  return project.chatHistory || [];
};

exports.deleteChatHistory = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  project.chatHistory = [];
  await project.save();
  return { message: 'Chat history deleted' };
};
