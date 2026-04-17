module.exports = (wizardAnswers, context) => {
  return `You are a senior full-stack engineer. Generate a concise Folder Structure document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Produce a clean, annotated folder structure tree for this project (Frontend, Backend, Shared). Use markdown code blocks. Include a brief one-line explanation for each major directory. Maximum 800 words.`;
};