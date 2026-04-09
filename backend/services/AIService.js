const axios = require('axios');
const AppError = require('../utils/AppError');

const providers = [
  { name: 'OPENROUTER_405', url: 'https://openrouter.ai/api/v1/chat/completions', model: 'meta-llama/llama-3.1-405b', getKey: () => process.env.AI_API_KEY },
  { name: 'OPENROUTER_70', url: 'https://openrouter.ai/api/v1/chat/completions', model: 'meta-llama/llama-3.1-70b', getKey: () => process.env.AI_API_KEY },
  { name: 'NVIDIA_NIM_405', url: 'https://integrate.api.nvidia.com/v1/chat/completions', model: 'meta/llama-3.1-405b-instruct', getKey: () => process.env.AI_API_KEY },
  { name: 'NVIDIA_NEMOTRON_340', url: 'https://integrate.api.nvidia.com/v1/chat/completions', model: 'nvidia/nemotron-4-340b-instruct', getKey: () => process.env.AI_API_KEY }
];

const callProvider = async (provider, prompt) => {
  const token = provider.getKey();
  if (!token) throw new Error(`${provider.name} API key not configured`);

  const response = await axios.post(
    provider.url,
    {
      model: provider.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2, // Keep generation deterministic
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(provider.name.startsWith('OPENROUTER') && {
          'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
          'X-Title': 'AiDocs'
        })
      },
      timeout: 60000 // 60s timeout limit
    }
  );

  const content = response.data.choices[0].message.content;
  return content;
};

exports.generateText = async (prompt, docType) => {
  const startTime = Date.now();
  let lastError = null;

  for (const provider of providers) {
    try {
      const content = await callProvider(provider, prompt);
      const generationTimeMs = Date.now() - startTime;
      
      return { 
        content, 
        modelUsed: provider.name, 
        generationTimeMs 
      };
    } catch (error) {
       console.error(`Provider ${provider.name} failed for ${docType}:`, error.message);
       lastError = error;
       // Continue loop for fallback cascade logic
    }
  }

  throw new AppError('AI Generation failed across all fallback providers.', 500, 'GENERATION_FAILED');
};
