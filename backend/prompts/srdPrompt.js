module.exports = (wizardAnswers, context) => {
  return `You are an expert software architect. Generate a highly detailed Software Requirements Document (SRD) in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Based on the PRD above, write a comprehensive SRD covering: System Overview, Functional Requirements (numbered FR-01, FR-02...), Non-Functional Requirements (NFR-01...), API Endpoints overview, Data Models overview, Integration Requirements, Security Requirements, and Performance Requirements. Be specific to this project.`;
};