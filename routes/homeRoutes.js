
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { User, Blog } = require('../models');

// Route for the home page
router.get('/', homeController.getHomePage);

// Route for user signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  res.json(user);
});

// Route for creating a new blog
router.post('/blogs', async (req, res) => {
  const { title, content, userId } = req.body;
  const blog = await Blog.create({ title, content, userId });
  res.json(blog);
});

module.exports = router;
