export const buildAgentPromptContext = (component) => {
  if (!component) return '';
  const title = component.title || 'UI Component';
  const category = component.category || 'UI';
  const framework = component.framework || 'CSS';
  const creator = component.creator?.displayName || 'Creator';
  const aiPrompt = component.aiPrompt || `Interactive ${category} component titled "${title}".`;
  const html = component.code?.html || component.code?.tailwind || '';
  const css = component.code?.css || '';
  const reactCode = component.code?.react || '';

  return `<!-- CLAUDE & CURSOR AI AGENT PROMPT CONTEXT: ${title} -->
# Component: ${title}
- Category: ${category}
- Framework: ${framework}
- Author: ${creator}

## AI Prompt Specification
${aiPrompt}

## System Rules & Guidelines
- Follow Neumorphic design standard background (#E0E5EC) and soft dual physics shadows.
- Maintain responsive, accessible component layout.
- Ensure zero dummy data and 100% working code logic.

## Code Implementation

### HTML / Tailwind
\`\`\`html
${html}
\`\`\`

${css ? `### Custom CSS
\`\`\`css
${css}
\`\`\`
` : ''}${reactCode ? `### React Component
\`\`\`jsx
${reactCode}
\`\`\`
` : ''}`;
};
