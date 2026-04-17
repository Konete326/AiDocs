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
      timeout: 60000 // 60s per provider — fail fast and try next
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
      
      if (error.response && [401, 403].includes(error.response.status)) {
        continue;
      }

      if (i < providers.length - 1) {
        await delay(1500);
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
      if (i < providers.length - 1) await delay(1500);
    }
  }
  throw new AppError('AI chat failed across all providers.', 500, 'CHAT_FAILED');
};

