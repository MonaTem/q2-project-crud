const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// load routes
const formulas = require('./routes/formulas'); // <--- ADDED

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

// Setup Middleware
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add routes
app.use('/formulas', formulas);  // <----- ADDED

app.listen(PORT, () => {
  console.log('Server listening on ', PORT);
})
