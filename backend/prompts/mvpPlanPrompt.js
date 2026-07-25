module.exports = (wizardAnswers, context) => {
  return `You are a product strategist. Generate a concise MVP Plan document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Create a realistic MVP Plan covering: MVP Scope, 3-Phase Roadmap, and a 8-12 week timeline. Maximum 1000 words. Focus on the fastest path to launch. Use tables for the roadmap.`;
};