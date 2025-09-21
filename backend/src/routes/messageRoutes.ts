import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getMessages, getusers, sendMessage } from "../controllers/messageController";
const router = express.Router();

router.get('/users',authMiddleware, getusers);

router.get('/:id', authMiddleware, getMessages);

router.post('/send/:id', authMiddleware, sendMessage);


export default router; 
