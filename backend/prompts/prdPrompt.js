module.exports = (wizardAnswers, context) => {
  return `You are an expert product manager. Generate a professional and TECHNICAL Product Requirements Document (PRD) in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Write a concise but technical PRD covering: Executive Summary, Problem Statement, Goals, Target Personas, Core Features, and Risks. Use bullet points heavily. Maximum 1200 words. Focus strictly on MVP scope.`;
};