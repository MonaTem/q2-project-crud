const app = require("express").Router();
const knex = require("../db");

/*
  RESTful formulas
*/

/*
  http --json \
    GET 'http://localhost:8000/formulas'
*/
app.get("/", (req, res) => {
  findformulas(req).then(formulas => res.json(formulas));
});

app.get("/new", (req, res) => {
});

/*
  http --json \
    GET 'http://localhost:8000/formulas/1'
*/
app.get("/:id", (req, res) => {
  findformula(req).then(formulas => res.json(formulas[0]));
});

/*
  http --json \
    POST 'http://localhost:8000/formulas' \
    title='A Short Title' description='A short description.'
*/
app.post("/", (req, res) => {
  createformula(req).then(formulas => res.json(formulas[0]));
});

/*
  http --json \
    PATCH 'http://localhost:8000/formulas/1' \
    title='COOOL!' description='WOOT!'
*/
app.patch("/:id", (req, res) => {
  updateformula(req).then(formulas => res.json(formulas[0]));
});

/*
  http --json \
    DELETE 'http://localhost:8000/formulas/1'
*/
app.delete("/:id", (req, res) => {
  destroyformula(req).then(() => res.sendStatus(204));
});

/********** HELPER FUNCTIONS ************/

// CREATE A formula
function createformula({ body: { title, description } }) {
  return knex("formulas")
    .returning("*")
    .insert({ title, description });
}

// Find all
function findformulas() {
  return knex('formulas');
}

// Find one
function findformula({params: { id }}) {
  return knex('formulas').where('id', id);
}

// Update
function updateformula({
  params: { id },
  body: { title, description },
}) {
  return knex('formulas')
    .where('id', id)
    .returning('*')
    .update({title, description});
}

// Destroy
function destroyformula({params: { id }}) {
  return knex('formulas')
    .where('id', id)
    .del();
}

module.exports = app;
