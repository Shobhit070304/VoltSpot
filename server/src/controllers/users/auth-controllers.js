import { validationResult } from 'express-validator';
import User from '../../models/users/User.js';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        user.password = undefined;

        res.status(200).json({ message: 'User registered successfully', user: user });
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'SECRET',
            { expiresIn: '1d' }
        );

        // Don't send password to response
        user.password = undefined;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
}

const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
}

const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
export { registerUser, loginUser, logoutUser, getUserProfile };