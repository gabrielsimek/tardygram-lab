import express from 'express';
import cookieParser from 'cookie-parser';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import postsController from './controllers/posts.js';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth/', authController);
app.use('/api/v1/posts/', postsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
