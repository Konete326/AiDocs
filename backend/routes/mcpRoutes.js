const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const mcpController = require('../controllers/mcpController');

router.all('/mcp', mcpController.handleMcpRequest);
router.get('/agent/mcp-status', authenticate, mcpController.getMcpStatus);
router.get('/users/mcp-config', authenticate, mcpController.getMcpConfig);
router.post('/users/mcp-config/regenerate', authenticate, mcpController.regenerateMcpKey);
router.delete('/users/mcp-config', authenticate, mcpController.deleteMcpKey);

module.exports = router;
