// loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.render('login', { layout: 'main' });
  }
});

router.post('/login', loginController.login);

module.exports = router;
