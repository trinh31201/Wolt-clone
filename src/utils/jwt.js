import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}
