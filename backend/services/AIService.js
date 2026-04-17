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
    model: 'meta-llama/llama-3.1-405b-instruct',
    getKey: () => process.env.OPENROUTER_API_KEY,
    headers: { 'HTTP-Referer': 'https://aidocs.com', 'X-Title': 'AiDocs' }
  },
  {
    name: 'OPENROUTER_70B',
    url: OPENROUTER_URL,
    model: 'meta-llama/llama-3.1-70b-instruct',
    getKey: () => process.env.OPENROUTER_API_KEY,
    headers: { 'HTTP-Referer': 'https://aidocs.com', 'X-Title': 'AiDocs' }
  },
  {
    name: 'NVIDIA_NEMOTRON_70B',
    url: NVIDIA_URL,
    model: 'nvidia/llama-3.1-nemotron-70b-instruct',
    getKey: () => process.env.NVIDIA_API_KEY,
    headers: {}
  }
];

const callProvider = async (provider, prompt, max_tokens = 2048) => {
  const token = provider.getKey();
  if (!token) throw new Error(`${provider.name} key not configured`);

  const response = await axios.post(
    provider.url,
    { 
      model: provider.model, 
      messages: [{ role: 'user', content: prompt }], 
      temperature: 0.2,
      max_tokens
    },
    {
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json', 
        ...provider.headers 
      },
      timeout: 60000 // 60s per provider — fail fast and try next
    }
  );

  return response.data.choices[0].message.content;
};

exports.generateText = async (prompt, docType, max_tokens = 2048) => {
  const startTime = Date.now();

  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    try {
      const content = await callProvider(provider, prompt, max_tokens);
      return { content, modelUsed: provider.name, generationTimeMs: Date.now() - startTime };
    } catch (error) {
      console.error(`[AIService] ${provider.name} failed (${docType}): ${error.message}`);
      
      // If unauthorized, don't retry this specific provider but move to next
      if (error.response && [401, 403].includes(error.response.status)) {
        continue;
      }

      if (i < providers.length - 1) {
        await delay(1000); // Reduced delay for faster transition
      }
    }
  }

  throw new AppError('AI generation failed across all providers.', 500, 'GENERATION_FAILED');
};

exports.generateChat = async (messages) => {
  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    try {
      const token = provider.getKey();
      if (!token) continue;

      const response = await axios.post(
        provider.url,
        { model: provider.model, messages, max_tokens: 1000, temperature: 0.7 },
        {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...provider.headers },
          timeout: 60000
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(`[AIService] ${provider.name} chat failed: ${error.message}`);
      if (i < providers.length - 1) await delay(1000);
    }
  }
  throw new AppError('AI chat failed across all providers.', 500, 'CHAT_FAILED');
};
