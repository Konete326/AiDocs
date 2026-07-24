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

    user.lastMcpActivityAt = new Date();
    user.save().catch(() => {});

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
    const isAgentActive = user.lastMcpActivityAt && (Date.now() - new Date(user.lastMcpActivityAt).getTime()) < 5 * 60 * 1000;
    return res.status(200).json({ success: true, apiKey: user.mcpApiKey || '', mcpEndpoint, isAgentActive: Boolean(isAgentActive), lastMcpActivityAt: user.lastMcpActivityAt || null });
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
    return res.status(200).json({ success: true, apiKey: user.mcpApiKey, mcpEndpoint: `${baseUrl}/api/mcp?apiKey=${user.mcpApiKey}`, isAgentActive: false });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

const deleteMcpKey = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    user.mcpApiKey = null;
    user.lastMcpActivityAt = null;
    await user.save();
    return res.status(200).json({ success: true, message: 'MCP API key revoked' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { handleMcpRequest, getMcpConfig, regenerateMcpKey, deleteMcpKey };
