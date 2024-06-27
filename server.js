const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Setting up Handlebars as the template engine
const hbs = exphbs.create({
    helpers: helpers 
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Update the views directory to point to the views directory
app.set('views', path.join(__dirname, 'views'));


// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const homeRoutes = require('./routes/homeRoutes');
app.use('/', homeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
