"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/signin', authControllers_1.signin);
router.post('/logout', authControllers_1.logout);
router.post('/signup', authControllers_1.signup);
router.get('/check', authMiddleware_1.authMiddleware, authControllers_1.checkAuth);
exports.default = router;
