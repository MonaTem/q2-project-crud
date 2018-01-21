const app = require('express').Router();

app.get('/', (req, res) => res.render('site/about'));

module.exports = app;
