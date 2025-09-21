import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getMessages, getusers } from "../controllers/messageController";
const router = express.Router();

router.get('/users',authMiddleware, getusers);

router.get('/checkMessages', authMiddleware, getMessages);


export default router; 
