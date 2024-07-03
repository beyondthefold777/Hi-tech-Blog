// controllers/authController.js
const { User } = require('../models');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create a new user with the provided username, email, and password
    const user = await User.create({ username, email, password });

    // Log the user in by setting the session
    req.session.user = user;

    // Redirect to the home page after successful signup
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};