import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
const app:Express = express();

import connectDB from './db';
import {tripsRouter, authRouter} from './router';
import { authMiddleware, errorMiddleware, notFoundMiddleware } from './middleware';
import helmet from 'helmet'
import cors from 'cors'

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/trips/mine', authMiddleware, tripsRouter);
app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5001
const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => console.log(`litening in PORT ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start();