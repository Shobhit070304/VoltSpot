import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/user.service.js';
import ApiError from '../config/ApiError.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendSuccess, sendValidationError } from '../utils/response.js';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      sendValidationError(res, errors.array()[0].msg);
      return;
    }

    const { name, email, password } = req.body;
    const user = await userService.register({ name, email, password });
    
    // Generate access token for the newly registered user
    const accessToken = jwt.sign(
      { userEmail: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // Return only safe user fields
    sendSuccess(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      accessToken
    }, 201, req);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      sendValidationError(res, errors.array()[0].msg);
      return;
    }

    const { email, password } = req.body;
    const { token, user } = await userService.login({ email, password });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, { token, user });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    userService.logout();
    res.clearCookie('token');
    sendSuccess(res, { message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const user = await userService.getProfile(req.user.userId);
    sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
};

const authUser = async (req: Request, res: Response) => {
  // @ts-ignore
  const { email, name, displayName } = req.firebaseUser;

  const userName = name || displayName || email.split('@')[0];
  let newUser = await User.findOne({ email });

  if (!newUser) {
    newUser = await User.create({ email, name: userName });
  }

  // @ts-ignore
  const token = jwt.sign({ userEmail: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  sendSuccess(res, { token, user: { ...newUser.toObject() } });
};

export default { registerUser, loginUser, logoutUser, getUserProfile, authUser };
