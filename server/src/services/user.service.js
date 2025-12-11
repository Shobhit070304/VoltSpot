import userRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';
import ApiError from '../config/ApiError.js';

const register = async ({ name, email, password }) => {
  // Check if user exists
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw new ApiError(400, 'User already exists with this email');
  }

  // Create user
  const user = await userRepository.create({ name, email, password });

  // Remove password before sending response
  user.password = undefined;

  return user;
};

const login = async ({ email, password }) => {
  // Fetch user
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Ensure secret is present
  if (!process.env.JWT_SECRET) {
    throw { status: 500, message: 'JWT secret not configured' };
  }

  // Generate JWT
  const token = jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Never expose password
  user.password = undefined;

  return { token, user };
};

const logout = () => {
  // Nothing to do, but keeps consistent architecture
  return true;
};

const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.password = undefined;
  return user;
};

export default { register, login, logout, getProfile };
