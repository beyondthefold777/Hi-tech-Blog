// controllers/dashboardController.js
const { Blog } = require('../models');

exports.getDashboard = async (req, res) => {
  const blogs = await Blog.findAll({ where: { userId: req.session.user.id } });
  const plainBlogs = blogs.map(blog => blog.get({ plain: true }));
  res.render('dashboard-content', { layout: 'dashboard-layout', username: req.session.user.username, blogs: plainBlogs });
};

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.create({ title, content, userId: req.session.user.id });
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByPk(id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  if (blog.userId !== req.session.user.id) {
    return res.status(403).json({ message: 'Not authorized to delete this blog' });
  }

  await blog.destroy();
  res.status(204).end();
};
