const express = require('express'); 
const exphbs = require('express-handlebars'); // Import Handlebars for templating
const path = require('path'); 
const helpers = require('./utils/helpers'); // Import custom helpers for Handlebars
const homeRoutes = require('./routes/homeRoutes'); 
const pool = require('./config/connection'); // Import the database connection pool
const session = require('express-session'); // Import session middleware
const dashboardRoutes = require('./routes/dashboardRoutes'); 
require('dotenv').config();

const app = express(); 
const PORT = process.env.PORT || 3001; 

const hbs = exphbs.create({ helpers }); 

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configure session middleware
app.use(session({
  secret: process.env.SECRET_KEY, // Secret key for session encryption
  resave: false, // Do not save session if unmodified
  saveUninitialized: true, // Save new sessions
  cookie: { secure: false } 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', homeRoutes); // Use home routes for the root path
app.use('/', dashboardRoutes); // Use dashboard routes for the root path

// Connect to the database and start the server
pool.connect()
  .then(() => {
    console.log('Successfully connected to the database'); // Log successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`); // Log the server URL after starting
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err); // Log any errors connecting to the database
  });
