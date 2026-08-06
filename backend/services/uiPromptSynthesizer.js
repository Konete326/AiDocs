const AIService = require('./AIService');
const AppError = require('../utils/AppError');

const synthesizePromptService = async (html = '', css = '') => {
  if (!html && !css) {
    throw new AppError('HTML or CSS code is required for synthesis.', 400, 'BAD_REQUEST');
  }

  const promptText = `Given this HTML:
${html}

And this CSS:
${css}

Synthesize a detailed AI Prompt for an AI Coding Agent to recreate this exact UI component. Include visual styling, colors, Neumorphic dual soft shadows (#E0E5EC base), border radiuses, hover effects, and micro-animations. Output ONLY the clean prompt text with zero markdown headers or extra conversation.`;

  const messages = [{ role: 'user', content: promptText }];
  const response = await AIService.generateChat(messages);
  return response.trim();
};

const convertFrameworkService = async (html = '', css = '') => {
  if (!html && !css) {
    throw new AppError('HTML or CSS code is required for framework conversion.', 400, 'BAD_REQUEST');
  }

  const promptText = `Convert this HTML/CSS into React JSX and Tailwind CSS:
HTML:
${html}

CSS:
${css}

Return ONLY a raw valid JSON object (no markdown quotes, no triple backticks) with keys:
"react": "<React JSX string>",
"tailwind": "<Tailwind CSS string>"`;

  const messages = [{ role: 'user', content: promptText }];
  const rawResponse = await AIService.generateChat(messages);

  try {
    const cleaned = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    const reactCleaned = html.replace(/class=/g, 'className=');
    return {
      react: `export default function Component() {\n  return (\n    ${reactCleaned}\n  );\n}`,
      tailwind: 'bg-[#E0E5EC] rounded-2xl shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]'
    };
  }
};

module.exports = {
  synthesizePromptService,
  convertFrameworkService
};
