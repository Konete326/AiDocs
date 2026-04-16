module.exports = (wizardAnswers, context) => {
  return `You are an expert AI systems architect. Generate a highly detailed AI Agent System Prompt document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Create a comprehensive system prompt document for AI agents working on this codebase. Include: 
1. A ready-to-use System Prompt (in a markdown code block) that gives an AI assistant full context about the project
2. Role Definition for the AI assistant
3. Project-Specific Instructions (tech stack, architecture, file structure)
4. Code Style Rules & Conventions
5. Do's and Don'ts specific to this codebase
6. Template prompts for common tasks (add feature, fix bug, write tests, refactor)
7. Example prompts for the 5 most common developer tasks in this project

Make it immediately usable by a developer working with AI tools like Cursor, Windsurf, or Claude.`;
};