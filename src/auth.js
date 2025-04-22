// src/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const generateToken = (userId) => {
  // Create token with user ID, expires in 1 hour
  return jwt.sign(
    { 
      id: userId
    },
    secret,
    { expiresIn: '1h' }
  );
};

const verifyToken = (token) => {
  try {
    // Verify token and return decoded payload
    const decoded = jwt.verify(token, secret);
    return {
      valid: true,
      user: decoded
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
};

module.exports = { generateToken, verifyToken };
