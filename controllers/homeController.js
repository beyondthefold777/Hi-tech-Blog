const { Blog, User } = require('../models');

const getHomePage = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: User, as: 'user' }],
      order: [['createdAt', 'DESC']]
    });

    const loggedIn = req.session.user ? true : false;

    res.render('layouts/main', { blogs, loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getHomePage
};
