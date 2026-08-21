require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const documentRoutes = require('./routes/documentRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const chatRoutes = require('./routes/chatRoutes');
const exportRoutes = require('./routes/exportRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const subscriptionController = require('./controllers/subscriptionController');
const { recoverAllStuckProjects } = require('./services/recoveryService');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://testclarifyai.vercel.app',
  'https://clarifyai.vercel.app',
  'https://clarifyai-backend.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

const allowedHeaders = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'Accept',
  'Cache-Control',
  'Pragma',
  'X-CSRF-Token',
  'X-Api-Version',
  'X-Idempotency-Key',
  'X-Refresh-Token',
  'x-refresh-token',
  'x-idempotency-key'
];

app.use((req, res, next) => {
  if (req.url && req.url.includes('//')) req.url = req.url.replace(/\/+/g, '/');
  if (req.url && req.url.startsWith('/api/api/')) req.url = req.url.replace(/^\/api\/api\//, '/api/');
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));
  }
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders
}));

recoverAllStuckProjects().catch(() => {});

app.use(async (req, res, next) => {
  if (req.method === 'OPTIONS') return next();
  try {
    await db();
    next();
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database connection failed', details: err.message });
  }
});

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan('dev'));
app.use('/api/subscriptions/webhook', express.raw({ type: 'application/json' }), subscriptionController.handleWebhook);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use('/api', apiLimiter);
app.set('trust proxy', 1);

app.get('/', (req, res) => res.status(200).json({ status: 'active', message: 'ClarifyAI API is running' }));

app.use(['/api/projects', '/projects'], require('./routes/skillsRoutes'), projectRoutes);
app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/users', '/users'], userRoutes);
app.use(['/api/projects/:projectId/documents', '/projects/:projectId/documents'], documentRoutes);
app.use(['/api/subscriptions', '/subscriptions'], subscriptionRoutes);
app.use(['/api/notifications', '/notifications'], notificationRoutes);
app.use(['/api', '/'], require('./routes/mcpRoutes'), chatRoutes, exportRoutes, suggestionRoutes);
app.use(['/api/feedback', '/feedback'], feedbackRoutes);
app.use(['/api/ui-components', '/ui-components'], require('./routes/uiComponentRoutes'));
app.use(['/api/github', '/github'], require('./routes/githubRoutes'));
app.use(['/api/webhooks', '/webhooks'], require('./routes/webhookRoutes'));
app.use(['/api/vscode', '/vscode'], require('./routes/vscodeRoutes'));

app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
