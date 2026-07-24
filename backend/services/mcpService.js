const { TOOLS_MANIFEST, handleToolCall } = require('./mcpToolsService');

const SERVER_INFO = { name: 'clarifyai-mcp', version: '1.1.0' };

const processMcpMessage = async (userId, body) => {
  const { jsonrpc, id, method, params } = body || {};
  if (jsonrpc !== '2.0') {
    return { jsonrpc: '2.0', id: id || null, error: { code: -32600, message: 'Invalid Request: Must be JSON-RPC 2.0' } };
  }

  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO
      }
    };
  }

  if (method === 'tools/list') {
    return { jsonrpc: '2.0', id, result: { tools: TOOLS_MANIFEST } };
  }

  if (method === 'tools/call') {
    const name = params?.name;
    const args = params?.arguments || {};
    const result = await handleToolCall(userId, name, args);
    return { jsonrpc: '2.0', id, result };
  }

  return { jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } };
};

module.exports = { processMcpMessage, TOOLS_MANIFEST, SERVER_INFO };
