// controllers/userController.js
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};
