import jwt from 'jsonwebtoken';
import admin from '../config/firebase.js';
import User from '../models/User.js';
import { NextFunction, Request, Response } from 'express';
import { ERROR_CODES } from '../utils/errorCodes.js';

export interface AuthRequest extends Request {
  user: {
    userId: string;
    userEmail: string;
  };
  firebaseUser?: any;
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;
  const token =
    req.cookies?.token ||
    (authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, code: ERROR_CODES.UNAUTHORIZED, message: 'No authentication token provided' });
  }
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, code: ERROR_CODES.INTERNAL_ERROR, message: 'JWT secret not configured' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    if (decoded.userEmail) {
      const user = await User.findOne({ email: decoded.userEmail });
      if (!user) {
        return res.status(401).json({ success: false, code: ERROR_CODES.UNAUTHORIZED, message: 'User not found' });
      }

      (req as AuthRequest).user = {
        userEmail: decoded.userEmail,
        userId: String(user._id),
      };
    } else {
      return res.status(401).json({ success: false, code: ERROR_CODES.UNAUTHORIZED, message: 'Invalid token structure' });
    }
    next();
  } catch (error) {
    return res.status(403).json({ success: false, code: ERROR_CODES.FORBIDDEN, message: 'Invalid or expired token' });
  }
};

const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Firebase auth middleware called');
    
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No Bearer token found');
      return res.status(401).json({ success: false, code: ERROR_CODES.UNAUTHORIZED, error: 'No token provided' });
    }

    const idToken = authHeader.split(' ')[1];
    console.log('Token extracted, length:', idToken.length);

    // Check if Firebase Admin is initialized
    try {
      const auth = admin.auth();
      console.log('Firebase Admin auth instance available');
      
      const decodedToken = await auth.verifyIdToken(idToken);
      console.log('Token verified successfully for user:', decodedToken.email);
      
      (req as AuthRequest).firebaseUser = decodedToken;
      next();
    } catch (firebaseError) {
      console.error('Firebase Admin error:', firebaseError);
      return res.status(500).json({ 
        success: false, 
        code: ERROR_CODES.INTERNAL_ERROR, 
        error: 'Firebase service unavailable' 
      });
    }
  } catch (err: any) {
    console.error('Token verification failed:', err);
    
    // Handle specific Firebase errors
    if (err.code === 'auth/argument-error') {
      return res.status(401).json({ 
        success: false, 
        code: ERROR_CODES.UNAUTHORIZED, 
        error: 'Invalid token format' 
      });
    }
    
    if (err.code === 'auth/id-token-expired') {
      return res.status(401).json({ 
        success: false, 
        code: ERROR_CODES.UNAUTHORIZED, 
        error: 'Token expired' 
      });
    }
    
    if (err.code === 'auth/id-token-revoked') {
      return res.status(401).json({ 
        success: false, 
        code: ERROR_CODES.UNAUTHORIZED, 
        error: 'Token revoked' 
      });
    }
    
    return res.status(401).json({ 
      success: false, 
      code: ERROR_CODES.UNAUTHORIZED, 
      error: 'Invalid or expired token' 
    });
  }
};

export { authUser, verifyFirebaseToken };
