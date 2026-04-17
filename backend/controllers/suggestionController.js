const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const AIService = require('../services/AIService');

exports.getSuggestions = asyncWrapper(async (req, res) => {
  const { projectTitle, projectType, fieldName, currentValue } = req.body;

  if (!fieldName) throw new AppError('fieldName required', 400, 'VALIDATION_ERROR');

  const prompt = buildSuggestionPrompt(projectTitle, projectType, fieldName, currentValue);
  const raw = await AIService.generateText(prompt, 'suggestion');

  const suggestions = parseSuggestions(raw.content);

  res.json({ success: true, data: { suggestions } });
});

function buildSuggestionPrompt(title, type, fieldName, currentValue) {
  const context = title ? `Project: "${title}" (${type || 'app'})` : `Project type: ${type || 'app'}`;

  const fieldInstructions = {
    title: 'Suggest 3 short, catchy product names (2-5 words each). Each on its own line starting with a dash.',
    problemStatement: 'Suggest 3 concise problem statements (1-2 sentences each). Each on its own line starting with a dash.',
    targetAudience: 'Suggest 3 specific target audience descriptions (1-2 sentences). Each on its own line starting with a dash.',
    coreFeatures: 'Suggest 3 comma-separated feature lists (4-6 features each). Each on its own line starting with a dash.',
    techPreferences: 'Suggest 3 tech stack options appropriate for this project (3-5 techs each). Each on its own line starting with a dash.',
    monetizationModel: 'Suggest 3 monetization strategies with brief explanation. Each on its own line starting with a dash.',
    additionalContext: 'Suggest 3 important additional context notes for this project. Each on its own line starting with a dash.',
  };

  const instruction = fieldInstructions[fieldName] || 'Give 3 relevant suggestions. Each on its own line starting with a dash.';

  const currentContext = currentValue ? `\nCurrent value: "${currentValue.slice(0, 100)}"` : '';

  return `${context}${currentContext}

Task: ${instruction}

Rules:
- Exactly 3 suggestions
- Each starts with "- "
- No numbering
- No explanations or headers
- Return ONLY the 3 lines, nothing else`;
}

function parseSuggestions(raw) {
  return raw
    .split('\n')
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(line => line.length > 0)
    .slice(0, 3);
}
