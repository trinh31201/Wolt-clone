import { generateToken } from '../utils/jwt.js';
import userService from '../service/user.js';

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already exists.',
      });
    }

    const newUser = await userService.createUser(req.body);

    const token = generateToken(newUser);

    res.status(200).json({
      status: 'success',
      message: 'User registered successfully.',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Error registering user.',
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully.',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Error logging in.',
    });
  }
};

export default {register, login};

