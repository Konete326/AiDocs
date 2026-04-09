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

const app = express();

// 1. Manual CORS Handling (MUST be after app = express())
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Dynamically allow the requesting origin if it's production or local
  if (origin && (origin.endsWith('.vercel.app') || origin === process.env.FRONTEND_URL || origin === 'http://localhost:5173')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Allow non-browser requests
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

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
app.use('/api/documents', documentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);

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
