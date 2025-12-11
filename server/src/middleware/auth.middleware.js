import jwt from 'jsonwebtoken';
import admin from '../config/firebase.js';
import User from '../models/User.js';

const authUser = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const token =
    req.cookies?.token ||
    (authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null);

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No authentication token provided' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token now contains userEmail, so we need to fetch the user
    if (decoded.userEmail) {
      const user = await User.findOne({ email: decoded.userEmail });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Attach both email and userId to req.user for backward compatibility
      req.user = {
        userEmail: decoded.userEmail,
        userId: user._id.toString(),
      };
    } else {
      // Fallback for old tokens (if any)
      req.user = decoded;
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const idToken = authHeader.split(' ')[1];

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.firebaseUser = decodedToken;

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export { authUser, verifyFirebaseToken };
