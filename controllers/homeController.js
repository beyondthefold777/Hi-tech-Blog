const { Blog, User, Comment } = require('../models');

const getHomePage = async (req, res) => {
  try {
    // Fetch blogs with associated user
    const blogs = await Blog.findAll({
      include: [
        { model: User, as: 'user' }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Fetch comments with associated user for each blog
    for (let blog of blogs) {
      blog.Comments = await Comment.findAll({
        where: { blogId: blog.id },
        include: [{ model: User, as: 'user' }]
      });
    }

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
