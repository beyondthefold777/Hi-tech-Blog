const { Blog } = require('../models');

exports.getDashboard = async (req, res) => {
  const blogs = await Blog.findAll({ where: { userId: req.session.user.id } });
  // Convert blogs to plain objects to avoid prototype access issues
  const plainBlogs = blogs.map(blog => blog.get({ plain: true }));
  res.render('dashboard-content', { layout: 'dashboard-layout', username: req.session.user.username, blogs: plainBlogs });
};

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.create({ title, content, userId: req.session.user.id });
  res.json(blog);
};


