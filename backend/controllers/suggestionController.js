const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const AIService = require('../services/AIService');

const normalizeField = (field) => {
  const map = {
    problem: 'problemStatement',
    audience: 'targetAudience',
    features: 'coreFeatures',
    context: 'additionalContext',
    tech: 'techPreferences',
    monetization: 'monetizationModel'
  };
  return map[field] || field;
};

exports.getSuggestions = asyncWrapper(async (req, res) => {
  const { projectTitle, projectType, fieldName, currentValue, wizardAnswers } = req.body;

  if (!fieldName) throw new AppError('fieldName required', 400, 'VALIDATION_ERROR');

  const normField = normalizeField(fieldName);
  const prompt = buildSuggestionPrompt(projectTitle, projectType, normField, currentValue, wizardAnswers);

  const aiResult = await AIService.generateText(prompt, 'suggestion', 150);
  const suggestions = parseSuggestions(aiResult.content);

  res.json({ success: true, data: { suggestions } });
});

function buildSuggestionPrompt(title, type, fieldName, currentValue, wizardAnswers = {}) {
  const categoryStr = type ? `Category: ${type.toUpperCase()}` : 'Category: SaaS';
  const titleStr = title ? `Project Name: "${title}"` : '';
  const problemStr = wizardAnswers?.problemStatement ? `Problem: "${wizardAnswers.problemStatement}"` : '';
  const audienceStr = wizardAnswers?.targetAudience ? `Audience: "${wizardAnswers.targetAudience}"` : '';

  const contextHeader = [categoryStr, titleStr, problemStr, audienceStr].filter(Boolean).join(' | ');

  const fieldInstructions = {
    title: `Generate 3 innovative, high-converting product names (2-3 words each) tailored to "${currentValue || title || 'this project'}".`,
    problemStatement: `Generate 3 clear, realistic problem statements (1-2 sentences) specifically addressing pain points for "${title || 'this project'}".`,
    targetAudience: `Generate 3 specific target audience profiles (1 sentence each) for "${title || 'this project'}".`,
    coreFeatures: `Generate 3 distinct sets of 4-5 comma-separated MVP features for "${title || 'this project'}".`,
    techPreferences: `Generate 3 optimal modern tech stacks specifically for "${title || 'this project'}".`,
    monetizationModel: `Generate 3 viable revenue and monetization models tailored for "${title || 'this project'}".`,
    additionalContext: `Generate 3 strategic competitive advantages for "${title || 'this project'}".`
  };

  const instruction = fieldInstructions[fieldName] || `Generate 3 high-impact ideas for "${title || 'this project'}".`;
  const currentDraft = currentValue ? `Draft: "${currentValue.slice(0, 150)}"` : '';

  return `Context: ${contextHeader}\n${currentDraft}\nTask: ${instruction}\nStrict Rules:\n- Return EXACTLY 3 lines\n- Each line MUST start with "- "\n- Do NOT include numbers, intro or outro text\n- 100% specific to "${title || currentValue || 'this product'}"`;
}

function parseSuggestions(raw) {
  if (!raw || typeof raw !== 'string') return [];
  return raw
    .split('\n')
    .map(line => line.replace(/^[-•*0-9.)\]]\s*/, '').trim())
    .filter(line => line.length > 3 && !line.toLowerCase().startsWith('here are') && !line.toLowerCase().startsWith('sure'))
    .slice(0, 3);
}
