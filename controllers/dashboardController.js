
const { Blog } = require('../models');

// Controller for displaying the dashboard
exports.getDashboard = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const blogs = await Blog.findAll({ where: { userId: req.session.user.id } });
  res.render('dashboard', { username: req.session.user.username, blogs });
};

// Controller for creating a new blog post
exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.create({ title, content, userId: req.session.user.id });
  res.json(blog);
};
