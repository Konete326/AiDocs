module.exports = (wizardAnswers, context) => {
  return `You are a senior full-stack engineer. Generate a concise and TECHNICAL Tech Stack document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Based on the PRD, recommend a complete tech stack covering: Frontend (framework, UI, state), Backend (runtime, framework), Database, Auth, and Hosting. Maximum 800 words. Focus on technical justification and compatibility. Use tables where appropriate.`;
};