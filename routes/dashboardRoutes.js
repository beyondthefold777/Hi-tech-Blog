
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route for displaying the dashboard
router.get('/dashboard', dashboardController.getDashboard);

// Route for creating a new blog post
router.post('/dashboard/blogs', dashboardController.createBlog);

module.exports = router;
