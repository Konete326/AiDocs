const { parseTechStack } = require('../services/techStackParser');

module.exports = (wizardAnswers, context) => {
  const parsed = parseTechStack(wizardAnswers);
  const selectedTech = wizardAnswers.techPreferences || parsed.displayName;

  return `You are a senior full-stack architect. Generate a concise and TECHNICAL Tech Stack document in raw Markdown format. No preamble, no code block fences.

CRITICAL STACK MANDATE:
The user has explicitly selected the following target architecture:
- Target Stack Specification: ${selectedTech}
- Profile: ${parsed.displayName}
- Frontend Framework: ${parsed.frontendFramework}
- Backend Framework/API: ${parsed.backendFramework} (${parsed.language})

MANDATE INSTRUCTION: You MUST document ONLY this selected stack (${selectedTech}). Do NOT default to Express or MERN unless Express/MERN is explicitly requested above. Ignore any outdated PRD references to alternative stacks.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Required Tech Stack Breakdown
Provide a structured Markdown document covering:
1. Executive Architecture Summary (${parsed.displayName})
2. Frontend Framework & UI Libraries (${parsed.frontendFramework})
3. Backend Runtime & API Framework (${parsed.backendFramework})
4. Database & Data Access Layer (ORM / Drivers)
5. Authentication, Authorization & Security Strategy
6. Hosting, Infrastructure & CI/CD Pipeline

Use Markdown tables to list Framework, Description, and Justification. Ensure 100% technical consistency with ${selectedTech}.`;
};