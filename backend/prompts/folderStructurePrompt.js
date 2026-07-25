const { parseTechStack } = require('../services/techStackParser');

module.exports = (wizardAnswers, context) => {
  const stack = parseTechStack(wizardAnswers);
  const title = wizardAnswers?.projectName || 'Project';

  return `You are a senior enterprise software architect for **${stack.displayName}**.
Generate a clean, professional Folder Structure document in raw Markdown format. No preamble, no markdown code block fences wrapping the entire document.

## Project Details
* **Project Name:** ${title}
* **Detected Tech Architecture:** ${stack.displayName} (\`${stack.profile}\`)
* **Frontend:** ${stack.frontendFramework}
* **Backend:** ${stack.backendFramework}
* **Language:** ${stack.language}

## Project Info Payload
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Docs Context
${context}

## Instructions
1. Produce an annotated directory tree specifically tailored for **${stack.displayName}** following official framework standards.
2. If Next.js: include \`app/\` (App Router), \`(auth)/\`, \`api/\`, \`components/ui/\`, \`lib/\`, \`next.config.js\`.
3. If Python FastAPI/Django: include \`app/routers/\`, \`app/schemas/\`, \`app/models/\`, \`requirements.txt\`, \`main.py\`.
4. If .NET C#: include Clean Architecture layout \`src/Api/Controllers/\`, \`src/Core/Entities/\`, \`src/Infrastructure/\`, \`Program.cs\`, \`.csproj\`.
5. If Laravel: include \`app/Http/Controllers/\`, \`app/Models/\`, \`routes/api.php\`, \`composer.json\`.
6. Include a clear breakdown of each directory's role and best practices for modular scalability. Maximum 800 words.`;
};