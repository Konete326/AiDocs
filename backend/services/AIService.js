const axios = require('axios');
const AppError = require('../utils/AppError');

const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const providers = [
  {
    name: 'NVIDIA_405B',
    url: NVIDIA_URL,
    model: 'meta/llama-3.1-405b-instruct',
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
  },
  {
    name: 'NVIDIA_NEMOTRON',
    url: NVIDIA_URL,
    model: 'nvidia/nemotron-4-340b-instruct',
    getKey: () => process.env.NVIDIA_API_KEY,
    headers: {}
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
      timeout: 120000 // Increased timeout to 2 mins for 405B
    }
  );

  return response.data.choices[0].message.content;
};

exports.generateText = async (prompt, docType) => {
  const startTime = Date.now();

  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    try {
      const content = await callProvider(provider, prompt);
      return { content, modelUsed: provider.name, generationTimeMs: Date.now() - startTime };
    } catch (error) {
      console.error(`[AIService] ${provider.name} failed (${docType}): ${error.message}`);
      
      // AI-06: Skip 401/403 errors (invalid/expired keys)
      if (error.response && [401, 403].includes(error.response.status)) {
        console.warn(`[AIService] Skipping ${provider.name} due to auth error`);
        continue;
      }

      // AI-07: 1.5s delay before next provider
      if (i < providers.length - 1) {
        await delay(1500);
      }
    }
  }

  throw new AppError('AI generation failed across all providers.', 500, 'GENERATION_FAILED');
};
