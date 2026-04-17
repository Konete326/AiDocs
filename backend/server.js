require('dotenv').config();

const requiredEnvVars = ['MONGODB_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
const missing = requiredEnvVars.filter(v => !process.env[v]);
if (missing.length > 0) {
  console.error(`❌ Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

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

const app = express();

// Database connection middleware for Serverless
app.use(async (req, res, next) => {
  try {
    await db();
    next();
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database connection failed', details: err.message });
  }
});

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 2. Helmet with Cross-Origin support
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(morgan('dev'));

// Static files and logs
const subscriptionController = require('./controllers/subscriptionController');
app.use('/api/subscriptions/webhook', express.raw({ type: 'application/json' }), subscriptionController.handleWebhook);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use('/api', apiLimiter);


// Trust proxy for Vercel/proxies
app.set('trust proxy', 1);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'active', message: 'SwiftDocs AI API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects/:projectId/documents', documentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', chatRoutes);
app.use('/api', exportRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api', suggestionRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only listen if not in a serverless environment (optional for local)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
