const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route for displaying the dashboard
router.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  dashboardController.getDashboard(req, res);
});

// Route for creating a new blog post
router.post('/blogs', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  dashboardController.createBlog(req, res);
});

module.exports = router;

