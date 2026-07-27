const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const clients = new Map();

const addClient = (projectId, res) => {
  if (!clients.has(projectId)) {
    clients.set(projectId, new Set());
  }
  clients.get(projectId).add(res);

  res.on('close', () => {
    const projectClients = clients.get(projectId);
    if (projectClients) {
      projectClients.delete(res);
      if (projectClients.size === 0) {
        clients.delete(projectId);
      }
    }
  });
};

const broadcastKanbanUpdate = (projectId, data) => {
  const projectClients = clients.get(projectId.toString());
  if (projectClients && projectClients.size > 0) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    projectClients.forEach(res => {
      try {
        res.write(payload);
      } catch (err) {
        console.error('SSE send error:', err);
      }
    });
  }
};

const broadcastAnnotation = (projectId, data) => {
  const projectClients = clients.get(projectId.toString());
  if (projectClients && projectClients.size > 0) {
    const payload = `data: ${JSON.stringify({ type: 'annotation_created', ...data })}\n\n`;
    projectClients.forEach(res => {
      try {
        res.write(payload);
      } catch (err) {
        console.error('SSE annotation send error:', err);
      }
    });
  }
};

const broadcastLiveSandbox = (projectId, liveUrl) => {
  const projectClients = clients.get(projectId.toString());
  if (projectClients && projectClients.size > 0) {
    const payload = `data: ${JSON.stringify({ type: 'live_sandbox', liveUrl })}\n\n`;
    projectClients.forEach(res => {
      try {
        res.write(payload);
      } catch (err) {
        console.error('SSE live_sandbox send error:', err);
      }
    });
  }
};

const broadcastChatUpdate = (projectId) => {
  const projectClients = clients.get(projectId.toString());
  if (projectClients && projectClients.size > 0) {
    const payload = `data: ${JSON.stringify({ type: 'chat_updated' })}

`;
    projectClients.forEach(res => {
      try { res.write(payload); } catch (err) { console.error('SSE chat send error:', err); }
    });
  }
};

module.exports = {
  eventEmitter,
  addClient,
  broadcastKanbanUpdate,
  broadcastAnnotation,
  broadcastLiveSandbox,
  broadcastChatUpdate
};

