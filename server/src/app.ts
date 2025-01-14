import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
import { corsConfig } from './config/cors-config';
import { connectMySqlDB } from './config/db-config';
import { indexRouter } from './routes';
import cors from 'cors';
import { errorHandler } from './middlewares/error-handler';
const app = express();

app.use(cors(corsConfig));
app.use(express.json());

app.use('/api', indexRouter);
app.use(errorHandler);

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectMySqlDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err: any) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};
startServer();
