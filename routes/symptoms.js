/*
  RESTful symptoms
*/
const app = require('express').Router();

const {
  createSymptom,
  findSymptoms,
  findSymptom,
  updateSymptom,
  destroySymptom
} = require("../models/symptoms");

/*
  http --json \
    GET 'http://localhost:8000/symptoms'
*/


app.get("/", (req, res) => {
  findSymptoms(req).then(symptoms => {
    res.format({
      "text/html": () => res.render("symptoms/index", { symptoms }),
      "application/json": () => res.json(symptoms)
    });
  });
});

app.get("/new", (req, res) => {
  res.render("symptoms/new");
});

/*
  http --json \
    GET 'http://localhost:8000/symptoms/1'
*/


app.get("/:sid", (req, res) => {
  findSymptom(req).then(symptoms => {
    const symptom = symptoms[0];

    res.format({
      "text/html": () => res.render("symptoms/show", { symptom }),
      "application/json": () => res.json(symptom)
    });
  });
});



/*
  http --json \
    POST 'http://localhost:8000/symptoms' \
    symptom='silliness'
*/
app.post("/", (req, res) => {
  createSymptom(req).then(symptoms => {
    const symptom = findSymptoms[0];

    res.format({
      "text/html": () => res.redirect(`/symptoms/${symptom.sid}`),
      "application/json": () => res.json(symptom)
    });
  });
});


/*
  http --json \
    PATCH 'http://localhost:8000/symptoms/1' \
    symptom='anxiety'
*/
app.patch("/:sid", (req, res) => {
  updateSymptom(req).then(symptoms => res.json(symptoms[0]));
});


/*
  http --json \
    DELETE 'http://localhost:8000/symptoms/1'
*/
app.delete("/:sid", (req, res) => {
  destroySymptom(req).then(() => res.sendStatus(204));
});


module.exports = app;
