module.exports = (wizardAnswers, context) => {
  return `You are an expert AI prompt engineer and senior developer. Generate a highly detailed Claude/AI Context document (CLAUDE.md) in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Create a comprehensive CLAUDE.md file that an AI coding assistant would use to understand this entire project. Include: Project Overview (1 paragraph), Tech Stack Summary, Architecture Decisions & Rationale, Key Business Rules, Database Schema Summary, API Endpoints List, Coding Conventions & Patterns used in this project, Common Tasks & How to accomplish them, Files to Never Modify, and Known Gotchas/Pitfalls. Write it as if briefing a new AI engineer joining the project.`;
};