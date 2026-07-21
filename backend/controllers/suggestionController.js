const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const AIService = require('../services/AIService');

exports.getSuggestions = asyncWrapper(async (req, res) => {
  const { projectTitle, projectType, fieldName, currentValue, wizardAnswers } = req.body;

  if (!fieldName) throw new AppError('fieldName required', 400, 'VALIDATION_ERROR');

  const prompt = buildSuggestionPrompt(projectTitle, projectType, fieldName, currentValue, wizardAnswers);
  const raw = await AIService.generateText(prompt, 'suggestion', 256);

  const suggestions = parseSuggestions(raw.content);

  res.json({ success: true, data: { suggestions } });
});

function buildSuggestionPrompt(title, type, fieldName, currentValue, wizardAnswers = {}) {
  const categoryStr = type ? `[Category: ${type.toUpperCase()}]` : '[Category: GENERAL]';
  const titleStr = title ? `[Project Title: "${title}"]` : '';
  const problemStr = wizardAnswers.problemStatement ? `[Problem: "${wizardAnswers.problemStatement}"]` : '';
  const audienceStr = wizardAnswers.targetAudience ? `[Target Audience: "${wizardAnswers.targetAudience}"]` : '';
  const featuresStr = wizardAnswers.coreFeatures ? `[Features: "${wizardAnswers.coreFeatures}"]` : '';

  const contextHeader = [categoryStr, titleStr, problemStr, audienceStr, featuresStr].filter(Boolean).join('\n');

  const fieldInstructions = {
    title: `Suggest 3 short, catchy product names (2-5 words each) tailored specifically for a ${type || 'software'} project.`,
    problemStatement: `Suggest 3 concise, realistic problem statements (1-2 sentences) tailored specifically for a ${type || 'software'} project named "${title || 'this app'}".`,
    targetAudience: `Suggest 3 specific target audience profiles (1-2 sentences) for a ${type || 'software'} project named "${title || 'this app'}".`,
    coreFeatures: `Suggest 3 sets of 4-5 comma-separated MVP features designed for a ${type || 'software'} project named "${title || 'this app'}".`,
    techPreferences: `Suggest 3 tech stack combinations (e.g. React/Node/MongoDB, Next.js/Supabase, React Native/Firebase) ideal for a ${type || 'software'} project.`,
    monetizationModel: `Suggest 3 monetization models (e.g. SaaS Monthly Subscription, Pay-per-use, Tiered Plans) suitable for a ${type || 'software'} project.`,
    additionalContext: `Suggest 3 strategic context or competitive advantage notes for a ${type || 'software'} project named "${title || 'this app'}".`,
  };

  const instruction = fieldInstructions[fieldName] || `Suggest 3 ideas tailored for a ${type || 'software'} project.`;
  const currentContext = currentValue ? `\nCurrent input draft: "${currentValue.slice(0, 100)}"` : '';

  return `Context:
${contextHeader}${currentContext}

Task: ${instruction}

Rules:
- Exactly 3 suggestions
- Each starts with "- "
- No numbering or extra formatting
- Make suggestions highly relevant to the ${type || 'software'} category and project context`;
}

function parseSuggestions(raw) {
  return raw
    .split('\n')
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(line => line.length > 0)
    .slice(0, 3);
}
