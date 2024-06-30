const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

router.get('/', homeController.getHomePage);

router.get('/signup', (req, res) => {
  res.render('signup', { loggedIn: req.session.user ? true : false });
});

router.post('/signup', authController.signup);

module.exports = router;
