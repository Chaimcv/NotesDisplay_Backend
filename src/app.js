import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Set security headers (relaxed for cross-origin communication)
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
