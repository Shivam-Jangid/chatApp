"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.logout = logout;
exports.signin = signin;
exports.checkAuth = checkAuth;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../lib/utils");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const userEmail = yield userModel_1.default.findOne({ email });
            const userName = yield userModel_1.default.findOne({ username });
            if (userEmail) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            if (userName) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            const newUser = new userModel_1.default({
                username,
                email,
                password: hashedPassword
            });
            if (newUser) {
                yield newUser.save();
                (0, utils_1.generateJWTs)(newUser._id, res);
                res.status(200).json({ message: 'User created successfully', email, username });
            }
            else {
                res.status(400).json({ message: 'Failed to create user' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.cookie('jwt', '', { maxAge: 0 });
            res.status(200).json({ message: 'User logged out successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    });
}
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            (0, utils_1.generateJWTs)(user._id, res);
            res.status(200).json({ message: 'User signed in successfully', email: user.email, username: user.username, userId: user._id });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    });
}
function checkAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json({ user: req.user });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error at controller', error });
        }
    });
}
