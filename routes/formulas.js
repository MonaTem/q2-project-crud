const app = require("express").Router();

console.log("the path is " + __dirname);
/*
  RESTful formulas
*/
const {
  createFormula,
  findFormulas,
  findFormula,
  updateFormula,
  destroyFormula
} = require("../models/formulas");


/*
  http --json \
    GET 'http://localhost:8000/formulas'
*/



app.get("/", (req, res) => {
  findFormulas(req).then(formulas => {
    res.format({
      'text/html': () =>  res.render('formulas/index', { formulas }),
      'application/json': () => res.json(formulas)
    });
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
  findFormula(req).then(formulas => {
    const formula = formulas[0];

    res.format({
      'text/html': () =>  res.render('formulas/show', { formula }),
      'application/json': () => res.json(formula)
    })
  });
});

/*
  http --json \
    POST 'http://localhost:8000/formulas' \
    english_name='A Short english_name' pinyin_name='A short pinyin_name.'
*/

app.post("/", (req, res) => {
  createFormula(req).then(formulas =>{
    const formula = formulas[0];

    res.format({
      'text/html': () =>  res.redirect(`/formulas/${formula.fid}`),
      'application/json': () => res.json(formulas)
    })
  });
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



module.exports = app;
