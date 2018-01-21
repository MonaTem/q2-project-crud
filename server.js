const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// load routes
const site = require('./routes/site'); // <--- ADDED
const formulas = require('./routes/formulas');
const about = require('./routes/about');

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

// Setup Middleware
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add routes
app.use('/', site);  // <----- ADDED
app.use('/formulas', formulas);
app.use('/about', about);

app.listen(PORT, () => {
  console.log('Server listening on ', PORT);
})
