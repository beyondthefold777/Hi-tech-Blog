const { Blog, User } = require('../models');

const getHomePage = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: User, as: 'user' }],
      order: [['createdAt', 'DESC']]
    });

    const loggedIn = req.session.user ? true : false;

    // Convert blogs to plain objects to avoid prototype access issues
    const plainBlogs = blogs.map(blog => blog.get({ plain: true }));

    res.render('layouts/main', { blogs: plainBlogs, loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getHomePage
};
