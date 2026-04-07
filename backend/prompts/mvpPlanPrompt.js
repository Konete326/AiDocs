module.exports = (wizardAnswers, previousDocs) => {
  return `Generate a highly detailed MVP Plan document in raw Markdown format (no preamble, no code block fences). 
  Context: ${JSON.stringify(wizardAnswers)}
  Previous Documents: ${Object.keys(previousDocs).join(', ')}`;
};