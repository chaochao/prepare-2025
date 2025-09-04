require('dotenv').config()
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import soapRoutes from './routes/soapRoutes';
import openAIRoutes from './routes/openAIRoutes';
import deepseekRoutes from './routes/deepseekRoutes';
import { soapService } from './services/soapService';
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
// TODO: add authentication/authorization middleware
// TODO: should be soap-notes
app.use('/api/soap', soapRoutes);
app.use('/api/openai', openAIRoutes);
app.use('/api/deepseek', deepseekRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Seed sample data in development
if (process.env.NODE_ENV !== 'production') {
  soapService.seedSampleData();
  console.log('Sample SOAP notes loaded');
}

app.listen(PORT, () => {
  console.log(`🚀 SOAP Notes API server running on port this ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API endpoints: http://localhost:${PORT}/api/soap`);
});

export default app;