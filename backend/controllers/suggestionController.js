const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const AIService = require('../services/AIService');

exports.getSuggestions = asyncWrapper(async (req, res) => {
  const { projectTitle, projectType, fieldName, currentValue, wizardAnswers } = req.body;

  if (!fieldName) throw new AppError('fieldName required', 400, 'VALIDATION_ERROR');

  const prompt = buildSuggestionPrompt(projectTitle, projectType, fieldName, currentValue, wizardAnswers);

  const aiResult = await AIService.generateText(prompt, 'suggestion', 256);
  const suggestions = parseSuggestions(aiResult.content);

  res.json({ success: true, data: { suggestions } });
});

function buildSuggestionPrompt(title, type, fieldName, currentValue, wizardAnswers = {}) {
  const categoryStr = type ? `Category: ${type.toUpperCase()}` : 'Category: General Software';
  const titleStr = title ? `Project Name: "${title}"` : '';
  const problemStr = wizardAnswers?.problemStatement ? `Problem: "${wizardAnswers.problemStatement}"` : '';
  const audienceStr = wizardAnswers?.targetAudience ? `Audience: "${wizardAnswers.targetAudience}"` : '';
  const featuresStr = wizardAnswers?.coreFeatures ? `Features: "${wizardAnswers.coreFeatures}"` : '';

  const contextHeader = [categoryStr, titleStr, problemStr, audienceStr, featuresStr].filter(Boolean).join(' | ');

  const fieldInstructions = {
    title: `Generate 3 creative, short, unique product names (2-4 words each) specifically for a ${type || 'software'} project based on draft "${title || currentValue || 'app'}".`,
    problemStatement: `Generate 3 concise, realistic problem statements (1-2 sentences each) specifically for "${title || 'this app'}".`,
    targetAudience: `Generate 3 specific target audience profiles (1 sentence each) for "${title || 'this app'}".`,
    coreFeatures: `Generate 3 distinct sets of 4-5 comma-separated MVP features for "${title || 'this app'}".`,
    techPreferences: `Generate 3 modern tech stack combinations ideal for "${title || 'this app'}".`,
    monetizationModel: `Generate 3 business monetization models suitable for "${title || 'this app'}".`,
    additionalContext: `Generate 3 strategic competitive advantages for "${title || 'this app'}".`
  };

  const instruction = fieldInstructions[fieldName] || `Generate 3 creative ideas for "${title || 'this app'}".`;
  const currentDraft = currentValue ? `Current draft input: "${currentValue.slice(0, 150)}"` : '';

  return `Context: ${contextHeader}
${currentDraft}

Task: ${instruction}

Formatting Rules:
- Return EXACTLY 3 lines
- Each line MUST start with "- "
- Do NOT add introductory text, numbering, or markdown formatting outside bullet points
- Tailor every suggestion directly to the specific project name "${title || currentValue || 'this project'}" and category "${type || 'software'}"`;
}

function parseSuggestions(raw) {
  if (!raw || typeof raw !== 'string') return [];
  return raw
    .split('\n')
    .map(line => line.replace(/^[-•*1-9.]\s*/, '').trim())
    .filter(line => line.length > 0)
    .slice(0, 3);
}
