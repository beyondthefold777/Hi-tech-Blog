// loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/login', (req, res) => {
  res.render('login-form', { layout: 'login' });
});

router.post('/login', loginController.login);

module.exports = router;

