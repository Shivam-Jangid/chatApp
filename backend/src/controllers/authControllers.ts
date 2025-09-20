import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateJWTs } from "../lib/utils";

async function signup (req:Request,res:Response){
    const {username, email, password} = req.body;
    try {
        if(!username || !email || !password ){
            return res.status(400).json({message: 'All fields are required'});
        }
        const userEmail = await User.findOne({email});
        const userName = await User.findOne({username});
        if(userEmail){
            return res.status(400).json({message: 'Email already exists'});
        }
        if(userName){
            return res.status(400).json({message: 'Username already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        if(newUser){
             await newUser.save();
             generateJWTs(newUser._id, res);
            res.status(200).json({message: 'User created successfully', email, username});
        } else {
            res.status(400).json({message: 'Failed to create user'});
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
}

async function logout (req:Request,res:Response){
    try{
        res.cookie('jwt', '', {maxAge: 0});
        res.status(200).json({message: 'User logged out successfully'});
    }    
    catch(error){
        res.status(500).json({message: 'Internal server error', error});
    }
}   

async function signin (req:Request,res:Response){
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        generateJWTs(user._id, res);
        res.status(200).json({message: 'User signed in successfully', email: user.email, username: user.username,userId: user._id});     
    }
    catch(error){
        res.status(500).json({message: 'Internal server error', error});
    }
}          
async function checkAuth (req:Request,res:Response){
   try{
    res.status(200).json({user: (req as any).user});
   }
    catch(error){
        res.status(500).json({message: 'Internal server error at controller', error});
    }
}   
export {signup, logout, signin, checkAuth};
