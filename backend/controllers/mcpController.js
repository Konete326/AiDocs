const crypto = require('crypto');
const User = require('../models/User');
const mcpService = require('../services/mcpService');

const generateKey = () => 'cl_mcp_' + crypto.randomBytes(24).toString('hex');

const handleMcpRequest = async (req, res) => {
  try {
    const apiKey = req.query.apiKey || req.headers['x-api-key'];
    if (!apiKey) return res.status(401).json({ jsonrpc: '2.0', id: req.body?.id || null, error: { code: -32001, message: 'Missing API key' } });

    const user = await User.findOne({ mcpApiKey: apiKey });
    if (!user || !user.mcpApiKey) return res.status(401).json({ jsonrpc: '2.0', id: req.body?.id || null, error: { code: -32001, message: 'Invalid or revoked API key' } });

    if (req.method === 'GET') {
      return res.status(200).json({ name: 'clarifyai-mcp', status: 'active', transport: 'streamable-http' });
    }

    const response = await mcpService.processMcpMessage(user._id, req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ jsonrpc: '2.0', id: req.body?.id || null, error: { code: -32603, message: err.message } });
  }
};

const getMcpConfig = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
    const mcpEndpoint = user.mcpApiKey ? `${baseUrl}/api/mcp?apiKey=${user.mcpApiKey}` : '';
    return res.status(200).json({ success: true, apiKey: user.mcpApiKey || '', mcpEndpoint, baseUrl });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

const regenerateMcpKey = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    user.mcpApiKey = generateKey();
    await user.save();
    const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
    return res.status(200).json({ success: true, apiKey: user.mcpApiKey, mcpEndpoint: `${baseUrl}/api/mcp?apiKey=${user.mcpApiKey}` });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

const deleteMcpKey = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    user.mcpApiKey = null;
    await user.save();
    return res.status(200).json({ success: true, message: 'MCP API key revoked successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { handleMcpRequest, getMcpConfig, regenerateMcpKey, deleteMcpKey };
