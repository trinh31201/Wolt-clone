import bcrypt from 'bcrypt';

const saltRounds = 10;

async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw new Error('Error hashing password');
  }
}

async function comparePassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    throw new Error('Error comparing password');
  }
}

export default {hashPassword, comparePassword}
