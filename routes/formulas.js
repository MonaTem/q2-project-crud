const app = require("express").Router();
const knex = require("../db");

console.log("the path is " + __dirname);
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
app.get("/:fid", (req, res) => {
  findformula(req).then(formulas => res.json(formulas[0]));
});

/*
  http --json \
    POST 'http://localhost:8000/formulas' \
    english_name='A Short english_name' pinyin_name='A short pinyin_name.'
*/
app.post("/", (req, res) => {
  createformula(req).then(formulas => res.json(formulas[0]));
});

/*
  http --json \
    PATCH 'http://localhost:8000/formulas/1' \
    english_name='COOOL!' pinyin_name='WOOT!'
*/
app.patch("/:fid", (req, res) => {
  updateformula(req).then(formulas => res.json(formulas[0]));
});

/*
  http --json \
    DELETE 'http://localhost:8000/formulas/1'
*/
app.delete("/:fid", (req, res) => {
  destroyformula(req).then(() => res.sendStatus(204));
});

/********** HELPER FUNCTIONS ************/

// CREATE A formula
function createformula({ body: { english_name, pinyin_name } }) {
  return knex("formulas")
    .returning("*")
    .insert({ english_name, pinyin_name });
}

// Find all
function findformulas() {
  return knex('formulas');
}

// Find one
function findformula({params: { fid }}) {
  return knex('formulas').where('fid', fid);
}

// Update
function updateformula({
  params: { fid },
  body: { english_name, pinyin_name },
}) {
  return knex('formulas')
    .where('fid', fid)
    .returning('*')
    .update({english_name, pinyin_name});
}

// Destroy
function destroyformula({params: { fid }}) {
  return knex('formulas')
    .where('fid', fid)
    .del();
}

module.exports = app;
