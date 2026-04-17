module.exports = (wizardAnswers, context) => {
  return `You are a senior UX designer. Generate a concise User Flows document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Document 3-5 critical user flows (Onboarding, Core Features) with numbered steps and a Mermaid flowchart for the main flow. Maximum 1000 words. Focus on technical logic and state transitions.`;
};