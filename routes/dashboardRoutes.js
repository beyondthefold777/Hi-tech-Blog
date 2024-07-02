const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { ensureAuthenticated } = require('../middleware/auth');

// Route for displaying the dashboard
router.get('/dashboard', ensureAuthenticated, dashboardController.getDashboard);

// Route for creating a new blog post
router.post('/dashboard/blogs', ensureAuthenticated, dashboardController.createBlog);

module.exports = router;


