//logincontroller
const { User } = require('../models');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await user.validPassword(password)) {
      req.session.user = { id: user.id, username: user.username };
      res.redirect('/dashboard');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};
