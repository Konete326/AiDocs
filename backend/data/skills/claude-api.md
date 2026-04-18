# Claude API Skill

Teaches agent to use the Anthropic Claude API effectively.

## Installation
```bash
npm install @anthropic-ai/sdk
# or Python
pip install anthropic
```

## Basic Usage (Node.js)
```js
const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const message = await client.messages.create({
  model: 'claude-opus-4-5',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Claude!' }],
});
console.log(message.content);
```

## Best Practices
- Always use system prompts to set behavior context
- Use streaming for long responses
- Handle rate limits with exponential backoff
- Cache responses where possible to reduce costs

## Models Available
- `claude-opus-4-5` — most capable
- `claude-sonnet-4-5` — balanced speed/capability
- `claude-haiku-3-5` — fastest, cheapest

## Placeholder
This is a placeholder skill. Replace with project-specific AI integration patterns.
