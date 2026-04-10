const axios = require('axios');
const AppError = require('../utils/AppError');

const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const providers = [
  {
    name: 'NVIDIA_LLAMA_405B',
    url: NVIDIA_URL,
    model: 'meta/llama-3.1-405b-instruct',
    getKey: () => process.env.NVIDIA_API_KEY,
    headers: {}
  },
  {
    name: 'NVIDIA_NEMOTRON_340B',
    url: NVIDIA_URL,
    model: 'nvidia/nemotron-4-340b-instruct',
    getKey: () => process.env.NVIDIA_API_KEY,
    headers: {}
  },
  {
    name: 'OPENROUTER_405B',
    url: OPENROUTER_URL,
    model: 'meta-llama/llama-3.1-405b',
    getKey: () => process.env.AI_API_KEY,
    headers: {
      'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
      'X-Title': 'AiDocs'
    }
  },
  {
    name: 'OPENROUTER_70B',
    url: OPENROUTER_URL,
    model: 'meta-llama/llama-3.1-70b',
    getKey: () => process.env.AI_API_KEY,
    headers: {
      'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
      'X-Title': 'AiDocs'
    }
  }
];

const callProvider = async (provider, prompt) => {
  const token = provider.getKey();
  if (!token) throw new Error(`${provider.name} key not configured`);

  const response = await axios.post(
    provider.url,
    { model: provider.model, messages: [{ role: 'user', content: prompt }], temperature: 0.2 },
    {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...provider.headers },
      timeout: 90000
    }
  );

  return response.data.choices[0].message.content;
};

exports.generateText = async (prompt, docType) => {
  const startTime = Date.now();

  for (const provider of providers) {
    try {
      const content = await callProvider(provider, prompt);
      return { content, modelUsed: provider.name, generationTimeMs: Date.now() - startTime };
    } catch (error) {
      console.error(`[AIService] ${provider.name} failed (${docType}): ${error.message}`);
    }
  }

  throw new AppError('AI generation failed across all providers.', 500, 'GENERATION_FAILED');
};
