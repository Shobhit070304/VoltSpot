import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No authentication token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authUser;