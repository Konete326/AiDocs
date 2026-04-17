module.exports = (wizardAnswers, context) => {
  return `You are an expert AI systems architect. Generate a concise AI Agent System Prompt in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Create a master system prompt for AI assistants working on this specific project. Include: Role, Core Rules, and 3-5 example task prompts. Maximum 1000 words. Focus on making it practical for immediate use in developer tools.`;
};