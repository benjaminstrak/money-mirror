/**
 * Local development server for API routes
 * This mimics Vercel serverless functions for local development
 * Run with: node server.js
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiHandler = require('./api/generate-image');
const geminiApiHandler = require('./api/generate-image-gemini');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API route - handle the serverless function for OpenAI
app.post('/api/generate-image', async (req, res) => {
  // Wrap the Vercel handler format
  const vercelReq = {
    method: req.method,
    body: req.body,
    headers: req.headers
  };
  
  const vercelRes = {
    status: (code) => {
      res.status(code);
      return vercelRes;
    },
    json: (data) => {
      res.json(data);
    }
  };
  
  try {
    await apiHandler(vercelReq, vercelRes);
  } catch (error) {
    console.error('API handler error:', error);
    res.status(500).json({ error: error.message });
  }
});

// API route - handle Gemini Nano Banana API
app.post('/api/generate-image-gemini', async (req, res) => {
  // Wrap the Vercel handler format
  const vercelReq = {
    method: req.method,
    body: req.body,
    headers: req.headers
  };
  
  const vercelRes = {
    status: (code) => {
      res.status(code);
      return vercelRes;
    },
    json: (data) => {
      res.json(data);
    }
  };
  
  try {
    await geminiApiHandler(vercelReq, vercelRes);
  } catch (error) {
    console.error('Gemini API handler error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from React app build (if built) or proxy to React dev server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  // In development, proxy React app requests to React dev server
  const { createProxyMiddleware } = require('http-proxy-middleware');
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true, // Enable websocket proxying for hot reload
      logLevel: 'silent'
    })
  );
}

app.listen(PORT, () => {
  console.log(`\n🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - OpenAI: http://localhost:${PORT}/api/generate-image`);
  console.log(`   - Gemini: http://localhost:${PORT}/api/generate-image-gemini`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`\n⚠️  Make sure React dev server is running on port 3000`);
    console.log(`   Start it with: npm start\n`);
  }
});

