// controllers/commentController.js
const { Comment } = require('../models');

exports.createComment = async (req, res) => {
  const { content, blogId } = req.body;
  const userId = req.session.user.id;

  try {
    const comment = await Comment.create({ content, blogId, userId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' });
  }
};
