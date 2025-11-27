import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, logoutUser, getUserProfile } from "../../controllers/users/auth-controllers.js";
import authUser from '../../middleware/auth.js';
const router = express.Router();


// Register a new user
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  registerUser
);

// Login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  loginUser
);

// Logout user
router.post('/logout', authUser, logoutUser);

// Get user profile
router.get('/profile', authUser, getUserProfile);

export default router;