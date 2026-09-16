import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    if (req.originalUrl.startsWith('/api')) {
      console.log(
        `[HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
      );
    }
  });

  next();
});

// API Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]', err);

  res.status(500).json({
    success: false,
    error: 'An internal server error occurred. Please try again later.'
  });
});

// Local development only
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('=========================================');
    console.log(`NOVA — AI Name Studio Server running on http://localhost:${PORT}`);
    console.log(
      `Mode: ${
        process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY
          ? 'LIVE_AI'
          : 'INTELLIGENT_DEMO'
      }`
    );
    console.log('=========================================');
  });
}

export default app;
