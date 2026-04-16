module.exports = (wizardAnswers, context) => {
  return `You are a senior database architect. Generate a highly detailed Database Schema document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Based on the PRD, SRD, and Tech Stack above, design a complete database schema covering: all Collections/Tables with their fields, types, constraints, and default values; Relationships & Foreign Keys; Indexes (with justification); Enums/Constants; and a Mermaid ER Diagram. Match the chosen database technology from the tech stack document.`;
};