// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const commentController = require('../controllers/commentController');

router.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  dashboardController.getDashboard(req, res);
});

router.post('/blogs', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  dashboardController.createBlog(req, res);
});

router.delete('/blogs/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  dashboardController.deleteBlog(req, res);
});

router.post('/comments', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  commentController.createComment(req, res);
});

module.exports = router;
