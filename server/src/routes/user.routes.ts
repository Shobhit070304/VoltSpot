import express from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user.controller.js';
import {
  authUser,
  verifyFirebaseToken,
} from '../middleware/auth.middleware.js';

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  userController.registerUser,
);

// Login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  userController.loginUser,
);

// Logout user
router.post('/logout', userController.logoutUser);

// Get user profile
router.get('/profile', authUser, userController.getUserProfile);

// Auth with Firebase
router.post('/firebase', verifyFirebaseToken, userController.authUser);

export default router;
