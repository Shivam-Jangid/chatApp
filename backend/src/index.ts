import express from 'express';
import authRoutes from './routes/authRoutes';   
import dotenv from 'dotenv';
import { connectDB } from './lib/db';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
 connectDB();
}
);