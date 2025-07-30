import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express'
import cors from 'cors';

import webhookRoutes from '../interface/routes';

const app = express();
app.use(express.json())
app.use(cors({
    origin: '*',
}))
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!")
})
app.use('/api', webhookRoutes);
export default app