module.exports = (wizardAnswers, context) => {
  return `You are an expert product manager. Generate a highly detailed Product Requirements Document (PRD) in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Write a comprehensive PRD covering: Executive Summary, Problem Statement, Goals & Success Metrics, Target Users & Personas, Core Features (with user stories), Non-Functional Requirements, Out of Scope, Timeline, and Risks. Be specific and technical.`;
};