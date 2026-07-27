const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const clients = new Map();

const cleanupStaleClients = () => {
  for (const [projectId, projectClients] of clients.entries()) {
    for (const res of projectClients) {
      if (res.writableEnded || res.destroyed || res.closed || !res.writable) {
        projectClients.delete(res);
      }
    }
    if (projectClients.size === 0) {
      clients.delete(projectId);
    }
  }
};

if (!global._sseCleanupInterval) {
  global._sseCleanupInterval = setInterval(cleanupStaleClients, 60 * 1000);
  if (global._sseCleanupInterval.unref) global._sseCleanupInterval.unref();
}

const addClient = (projectId, res) => {
  const key = projectId.toString();
  if (!clients.has(key)) {
    clients.set(key, new Set());
  }
  clients.get(key).add(res);

  const cleanup = () => {
    const projectClients = clients.get(key);
    if (projectClients) {
      projectClients.delete(res);
      if (projectClients.size === 0) {
        clients.delete(key);
      }
    }
  };

  res.on('close', cleanup);
  res.on('finish', cleanup);
  res.on('error', cleanup);
};

const sendToClients = (projectId, payload) => {
  const key = projectId.toString();
  const projectClients = clients.get(key);
  if (!projectClients || projectClients.size === 0) return;

  const toRemove = [];
  projectClients.forEach(res => {
    if (res.writableEnded || res.destroyed || res.closed || !res.writable) {
      toRemove.push(res);
      return;
    }
    try {
      res.write(payload);
    } catch (err) {
      toRemove.push(res);
    }
  });

  toRemove.forEach(res => projectClients.delete(res));
  if (projectClients.size === 0) {
    clients.delete(key);
  }
};

const broadcastKanbanUpdate = (projectId, data) => {
  sendToClients(projectId, `data: ${JSON.stringify(data)}\n\n`);
};

const broadcastAnnotation = (projectId, data) => {
  sendToClients(projectId, `data: ${JSON.stringify({ type: 'annotation_created', ...data })}\n\n`);
};

const broadcastLiveSandbox = (projectId, liveUrl) => {
  sendToClients(projectId, `data: ${JSON.stringify({ type: 'live_sandbox', liveUrl })}\n\n`);
};

const broadcastChatUpdate = (projectId) => {
  sendToClients(projectId, `data: ${JSON.stringify({ type: 'chat_updated' })}\n\n`);
};

module.exports = {
  eventEmitter,
  addClient,
  broadcastKanbanUpdate,
  broadcastAnnotation,
  broadcastLiveSandbox,
  broadcastChatUpdate
};

