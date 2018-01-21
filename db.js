const dbConfig = require('./knexfile').development;
  const knex = require('knex')(dbConfig);

  module.exports = knex;
