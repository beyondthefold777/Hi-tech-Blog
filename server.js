// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');
const homeRoutes = require('./routes/homeRoutes');
const loginRoutes = require('./routes/loginRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const sequelize = require('./config/connection'); // Import the Sequelize instance
const session = require('express-session');
require('dotenv').config();
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers: require('./utils/helpers'),
  partialsDir: path.join(__dirname, 'views/partials')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.user ? true : false;
  next();
});

app.use(morgan('dev'));

// Import logoutRoutes
const logoutRoutes = require('./routes/logoutRoutes');

// Use logoutRoutes
app.use('/', logoutRoutes);
app.use('/', homeRoutes);
app.use('/', loginRoutes);
app.use('/dashboard', dashboardRoutes);

// Authenticate the Sequelize instance
sequelize.authenticate()
  .then(() => {
    console.log('Successfully connected to the database');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });
