// src/index.js
const express = require('express');
const { generateToken, verifyToken } = require('./auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to create JWT (modified to use query parameter)
app.post('/auth/create-token', (req, res) => {
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  const token = generateToken(user_id);
  
  res.status(200).json({ token });
});

// Endpoint to verify JWT
app.post('/auth/verify-token', (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const result = verifyToken(token);
  res.status(200).json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
