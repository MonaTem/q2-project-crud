const app = require('express').Router();

app.get('/', (req, res) => res.render('site/home'));

module.exports = app;
