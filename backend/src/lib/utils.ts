import dotenv from 'dotenv';
import { Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET;
export const generateJWTs = (userId:mongoose.Types.ObjectId, res:Response) => {
    const token = jwt.sign({id: userId}, jwtSecret!, {expiresIn: '7d'});

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return token;
}
