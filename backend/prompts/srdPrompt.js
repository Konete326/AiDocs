module.exports = (wizardAnswers, context) => {
  return `You are an expert software architect. Generate a concise and TECHNICAL Software Requirements Document (SRD) in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Based on the PRD, write a technical SRD covering: System Architecture, Functional Requirements (numbered list), API Endpoints summary, Data Models, and Security. Maximum 1200 words. Use bullet points and focus on technical implementation details.`;
};