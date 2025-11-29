import { validationResult } from 'express-validator';
import userService from '../services/user.service.js';
import ApiError from '../config/ApiError.js';

const registerUser = async (req, res, next) => {
  try {
    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, errors.array()[0].msg);
    }

    const { name, email, password } = req.body;

    // Call service
    const user = await userService.register({ name, email, password });

    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, errors.array()[0].msg);
    }

    const { email, password } = req.body;

    // Service handles business logic
    const { token, user } = await userService.login({ email, password });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    userService.logout(); // no business logic here but uniformity :)
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default { registerUser, loginUser, logoutUser, getUserProfile };
