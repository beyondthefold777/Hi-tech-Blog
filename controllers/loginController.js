exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
  
    if (user && await user.validPassword(password)) {
      req.session.user = {
        id: user.id,
        username: user.username
      };
      res.redirect('/dashboard');
    } else {
      res.redirect('/login');
    }
  };
  