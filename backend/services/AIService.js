const axios = require('axios');
const AppError = require('../utils/AppError');

const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const providers = [
  {
    name: 'GEMINI_FLASH',
    type: 'gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
    getKey: () => process.env.GEMINI_API_KEY
  },
  {
    name: 'NVIDIA_70B',
    type: 'openai',
    url: NVIDIA_URL,
    model: 'meta/llama-3.1-70b-instruct',
    getKey: () => process.env.NVIDIA_API_KEY,
    headers: {}
  },
  {
    name: 'OPENROUTER_405B',
    type: 'openai',
    url: OPENROUTER_URL,
    model: 'meta-llama/llama-3.1-405b-instruct',
    getKey: () => process.env.OPENROUTER_API_KEY,
    headers: { 'HTTP-Referer': 'https://aidocs.com', 'X-Title': 'AiDocs' }
  },
  {
    name: 'OPENROUTER_70B',
    type: 'openai',
    url: OPENROUTER_URL,
    model: 'meta-llama/llama-3.1-70b-instruct',
    getKey: () => process.env.OPENROUTER_API_KEY,
    headers: { 'HTTP-Referer': 'https://aidocs.com', 'X-Title': 'AiDocs' }
  },
  {
    name: 'NVIDIA_8B',
    type: 'openai',
    url: NVIDIA_URL,
    model: 'meta/llama-3.1-8b-instruct',
    getKey: () => process.env.NVIDIA_API_KEY,
    headers: {}
  }
];

const callProvider = async (provider, prompt, max_tokens = 2048) => {
  const token = provider.getKey();
  if (!token) throw new Error(`${provider.name} key not configured`);

  if (provider.type === 'gemini') {
    const response = await axios.post(
      `${provider.url}?key=${token}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: max_tokens
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );
    
    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid Gemini API response structure');
    }
    return response.data.candidates[0].content.parts[0].text;
  } else {
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
        timeout: 15000
      }
    );

    return response.data.choices[0].message.content;
  }
};

exports.generateText = async (prompt, docType, max_tokens = 2048) => {
  const startTime = Date.now();

  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    if (!provider.getKey()) continue;

    try {
      const content = await callProvider(provider, prompt, max_tokens);
      return { content, modelUsed: provider.name, generationTimeMs: Date.now() - startTime };
    } catch (error) {
      console.error(`[AIService] ${provider.name} failed (${docType}): ${error.message}`);
      
      if (error.response && [401, 403].includes(error.response.status)) {
        continue;
      }

      if (i < providers.length - 1) {
        await delay(500);
      }
    }
  }

  throw new AppError('AI generation failed across all providers.', 500, 'GENERATION_FAILED');
};

exports.generateChat = async (messages) => {
  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    const token = provider.getKey();
    if (!token) continue;

    try {
      if (provider.type === 'gemini') {
        const contents = messages.map(m => {
          const parts = [{ text: m.content || '' }];
          if (m.images && Array.isArray(m.images)) {
            m.images.forEach(img => {
              if (img.dataUrl) {
                const base64Data = img.dataUrl.split(',')[1] || img.dataUrl;
                parts.push({
                  inline_data: {
                    mime_type: img.type || 'image/png',
                    data: base64Data
                  }
                });
              }
            });
          }
          return {
            role: m.role === 'assistant' ? 'model' : 'user',
            parts
          };
        });

        const response = await axios.post(
          `${provider.url}?key=${token}`,
          {
            contents,
            generationConfig: {
              maxOutputTokens: 1000,
              temperature: 0.7
            }
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 15000
          }
        );

        return response.data.candidates[0].content.parts[0].text;
      } else {
        const response = await axios.post(
          provider.url,
          { model: provider.model, messages, max_tokens: 1000, temperature: 0.7 },
          {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...provider.headers },
            timeout: 15000
          }
        );

        return response.data.choices[0].message.content;
      }
    } catch (error) {
      console.error(`[AIService] ${provider.name} chat failed: ${error.message}`);
      if (i < providers.length - 1) await delay(500);
    }
  }
  throw new AppError('AI chat failed across all providers.', 500, 'CHAT_FAILED');
};
