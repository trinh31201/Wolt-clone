import User from '../models/user.js';

const createUser = (userData) => {
  return User.create(userData);
};

const getUsers = (query) => {
  const { page = 1, limit = 10 } = query;
  const offset = (page - 1) * limit;

  const filter = {};
  const { gender } = query;
  if (gender) filter.gender = gender;

  return User.findAll({
    where: filter,
    limit,
    offset,
    order: [['name', 'ASC']],
  });
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const getUserByEmail = (email) => {
  return User.findOne({ where: { email } });
};

const deleteUserById = async (id) => {
  const deletedCount = await User.destroy({
    where: { id }
  });
  return deletedCount;
};

export const updateUserById = async (id, updateData) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.update(updateData);
  return user;
};

export default {
  createUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByEmail
};