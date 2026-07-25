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

module.exports = {
  eventEmitter,
  addClient,
  broadcastKanbanUpdate
};
