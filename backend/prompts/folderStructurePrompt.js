module.exports = (wizardAnswers, context) => {
  return `You are a senior full-stack engineer. Generate a highly detailed Folder Structure document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Based on the tech stack and SRD above, produce a complete annotated folder/file structure for this project. Show the full directory tree using markdown code blocks. Include: frontend structure (components, pages, hooks, services, types), backend structure (routes, controllers, services, models, middleware, utils), shared types/constants, config files, and CI/CD setup. Add a one-line comment on every folder explaining its purpose.`;
};