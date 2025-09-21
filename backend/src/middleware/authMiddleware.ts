import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = async (req:AuthRequest, res:Response, next:NextFunction) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: 'No token, authorization denied'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if(!decoded){
            return res.status(401).json({message: 'Token is not valid'});
        }
        const id = (decoded as {id: string}).id;
        const user = await User.findById(id).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        req.user = user;
        next();
    }
    catch(error){
        res.status(500).json({message: 'Internal server error at middleware', error});
    }
}       