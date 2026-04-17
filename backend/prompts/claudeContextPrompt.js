module.exports = (wizardAnswers, context) => {
  return `You are a senior developer. Generate a concise Claude/AI Context document (CLAUDE.md) in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Create a CLAUDE.md file containing: Project Overview, Tech Stack, Coding Patterns, and Key API/Database info. Maximum 1200 words. This will be used by AI assistants to understand the repo.`;
};