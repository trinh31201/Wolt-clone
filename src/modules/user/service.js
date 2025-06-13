import User from './model.js';

const createUser = (userData) => {
  return User.create(userData);
};

const getUsers = (query) => {
  // Add pagination
  const { page = 1, limit = 10 } = query;
  const offset = (page - 1) * limit;

  // Filter by gender
  const filter = {};
  const { gender } = query;
  if (gender) filter.gender = gender;

  // Other business logic if required
  return User.findAll({
    where: filter,
    limit,
    offset,
    order: [['name', 'ASC']],
  });
};
export default {
  createUser,
  getUsers
};