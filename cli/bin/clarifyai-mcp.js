#!/usr/bin/env node

const readline = require('readline');
const axios = require('axios');

const args = process.argv.slice(2);
let apiKey = process.env.CLARIFYAI_API_KEY || '';
let endpoint = process.env.CLARIFYAI_MCP_ENDPOINT || 'https://clarifyai-backend.vercel.app/api/mcp';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--key' && args[i + 1]) {
    apiKey = args[i + 1];
    i++;
  } else if (args[i] === '--endpoint' && args[i + 1]) {
    endpoint = args[i + 1];
    i++;
  }
}

if (!endpoint.includes('apiKey=') && apiKey) {
  const separator = endpoint.includes('?') ? '&' : '?';
  endpoint = `${endpoint}${separator}apiKey=${apiKey}`;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', async (line) => {
  if (!line || !line.trim()) return;
  try {
    const payload = JSON.parse(line.trim());
    const response = await axios.post(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'x-api-key': apiKey } : {})
      }
    });
    process.stdout.write(JSON.stringify(response.data) + '\n');
  } catch (err) {
    const errRes = {
      jsonrpc: '2.0',
      id: null,
      error: { code: -32603, message: err.response?.data?.error?.message || err.message }
    };
    process.stdout.write(JSON.stringify(errRes) + '\n');
  }
});
