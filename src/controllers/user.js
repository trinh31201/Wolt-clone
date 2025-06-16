import userService from '../service/user.js';

const addUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(200).json({
      status: 'success',
      message: 'User created successfully.',
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error creating user.' });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers(req.query);
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error fetching users.' });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error fetching user.' });
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedCount = await userService.deleteUserById(userId);

    if (deletedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error deleting user.' });
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await userService.updateUserById(userId, updateData);

    if (!updatedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully.',
      data: { updatedUser }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error updating user.' });
  }
};


export default {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById
};