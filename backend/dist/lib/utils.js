"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWTs = exports.jwtSecret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
exports.jwtSecret = process.env.JWT_SECRET;
const generateJWTs = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ id: userId }, exports.jwtSecret, { expiresIn: '7d' });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return token;
};
exports.generateJWTs = generateJWTs;
