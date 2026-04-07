module.exports = (wizardAnswers, previousDocs) => {
  return `Generate a highly detailed Database Schema document in raw Markdown format (no preamble, no code block fences). 
  Context: ${JSON.stringify(wizardAnswers)}
  Previous Documents: ${Object.keys(previousDocs).join(', ')}`;
};