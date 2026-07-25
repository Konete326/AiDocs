module.exports = (wizardAnswers, context) => {
  return `You are a senior database architect. Generate a concise Database Schema document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Design a complete database schema covering: Collections/Tables with fields, types, and constraints; Relationships; and a Mermaid ER Diagram. Maximum 1000 words. Focus on a clean, scalable design for the MVP.`;
};