import express from 'express';
import { checkAuth, logout, signin, signup } from '../controllers/authControllers';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();


router.post('/signin', signin);

router.post('/logout',logout);

router.post('/signup',signup);

router.get('/check',authMiddleware, checkAuth);
export default router;