const { parseTechStack } = require('../services/techStackParser');

module.exports = (wizardAnswers, context) => {
  const stack = parseTechStack(wizardAnswers);
  const title = wizardAnswers?.projectName || 'Project';

  return `You are an expert lead software architect for **${stack.displayName}**.
Generate a comprehensive, production-grade AI Context document (\`CLAUDE.md\`) in raw Markdown format. No preamble, no enclosing code block fences.

## Project Details
* **Title:** ${title}
* **Detected Architecture:** ${stack.displayName} (\`${stack.profile}\`)
* **Frontend Framework:** ${stack.frontendFramework}
* **Backend Framework:** ${stack.backendFramework}
* **Language Ecosystem:** ${stack.language}

## Project Payload
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Docs
${context}

## Framework-Specific AI Coding Rules
${stack.rules.map((rule, i) => `${i + 1}. ${rule}`).join('\n')}

## Instructions
1. Format as a clean, structured \`CLAUDE.md\` file for AI coding assistants (Claude, Cursor, Copilot).
2. Include sections: Project Overview, Framework Architecture, Stack Specific Coding Standards, API & Database Patterns, and Key CLI Commands.
3. Explicitly enforce the framework-specific AI coding rules above so AI agents generate 100% correct ${stack.displayName} code instead of generic Express/MERN code. Maximum 1200 words.`;
};