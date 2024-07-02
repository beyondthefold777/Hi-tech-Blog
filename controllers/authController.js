// controllers/authController.js
const { User } = require('../models');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    req.session.user = { id: user.id, username: user.username };
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error signing up');
  }
};

module.exports = {
  signup
};