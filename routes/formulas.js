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
  findFormulas(req).then(formulas => {
    res.format({
      'text/html': () =>  res.render('formulas/index', { formulas }),
      'application/json': () => res.json(formulas)
    })
  });
});


app.get("/new", (req, res) => {
  res.render('formulas/new');
});

/*
  http --json \
    GET 'http://localhost:8000/formulas/1'
*/
app.get("/:fid", (req, res) => {
  findFormula(req).then(formulas => res.json(formulas[0]));
});

/*
  http --json \
    POST 'http://localhost:8000/formulas' \
    english_name='A Short english_name' pinyin_name='A short pinyin_name.'
*/
app.post("/", (req, res) => {
  createFormula(req).then(formulas => res.json(formulas[0]));
});

/*
  http --json \
    PATCH 'http://localhost:8000/formulas/1' \
    english_name='COOOL!' pinyin_name='WOOT!'
*/
app.patch("/:fid", (req, res) => {
  updateFormula(req).then(formulas => res.json(formulas[0]));
});

/*
  http --json \
    DELETE 'http://localhost:8000/formulas/1'
*/
app.delete("/:fid", (req, res) => {
  destroyFormula(req).then(() => res.sendStatus(204));
});

/********** HELPER FUNCTIONS ************/

// CREATE A formula
function createFormula({ body: { english_name, pinyin_name } }) {
  return knex("formulas")
    .returning("*")
    .insert({ english_name, pinyin_name });
}

// Find all
function findFormulas() {
  return knex('formulas');
}

// Find one
function findFormula({params: { fid }}) {
  return knex('formulas').where('fid', fid);
}

// Update
function updateFormula({
  params: { fid },
  body: { english_name, pinyin_name },
}) {
  return knex('formulas')
    .where('fid', fid)
    .returning('*')
    .update({english_name, pinyin_name});
}

// Destroy
function destroyFormula({params: { fid }}) {
  return knex('formulas')
    .where('fid', fid)
    .del();
}

module.exports = app;
