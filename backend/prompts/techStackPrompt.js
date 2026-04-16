module.exports = (wizardAnswers, context) => {
  return `You are a senior full-stack engineer. Generate a highly detailed Tech Stack document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Based on the PRD and SRD above, recommend and justify a complete tech stack covering: Frontend (framework, UI library, state management, routing), Backend (runtime, framework, ORM), Database (primary DB, caching, search), Authentication, Storage, Hosting & DevOps, Third-party APIs & Services, and Testing Strategy. For each choice explain WHY it fits this specific project.`;
};