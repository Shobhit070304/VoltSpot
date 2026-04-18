import userRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';
import ApiError from '../config/ApiError.js';
import { IUser } from '../models/User.js';
import { ERROR_CODES } from '../utils/errorCodes.js';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

const register = async ({ name, email, password }: RegisterParams): Promise<IUser> => {
  // Check if user exists
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw new ApiError('User already exists with this email', 409, ERROR_CODES.DUPLICATE_ENTRY);
  }

  // Create user
  const user = await userRepository.create({ name, email, password });

  // Remove password before sending response
  // @ts-ignore
  user.password = undefined;

  return user;
};

const login = async ({ email, password }: LoginParams): Promise<{ token: string; user: IUser }> => {
  // Fetch user
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new ApiError('User not found', 404, ERROR_CODES.NOT_FOUND);
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401, ERROR_CODES.UNAUTHORIZED);
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
  // @ts-ignore
  user.password = undefined;

  return { token, user };
};

const logout = () => {
  // Nothing to do, but keeps consistent architecture
  return true;
};

const getProfile = async (userId: string): Promise<IUser> => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new ApiError('User not found', 404, ERROR_CODES.NOT_FOUND);
  }

  // @ts-ignore
  user.password = undefined;
  return user;
};

export default { register, login, logout, getProfile };
