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

app.get("/:sid/delete", (req, res) => {
  findSymptom(req).then(symptoms => {
    const symptom = symptoms[0];

    res.format({
      "text/html": () => res.render("symptoms/delete", { symptom }),
      "application/json": () => res.json(symptom)
    });
  });
  });

  app.get("/:sid/update", (req, res) => {
    findSymptom(req).then(symptoms => {
      const symptom = symptoms[0];

      res.format({
        "text/html": () => res.render("symptoms/update", { symptom }),
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
    const symptom = symptoms[0];

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
    Using app.post for update because patch doesn't
    seem to work in our form, but post does--although patch
    works fine in httpie or curl
*/
app.post("/update/:sid/", (req, res) => {
  updateSymptom(req).then(symptoms => {
    res.redirect(/symptoms/);
  });
});


/*
  http --json \
    DELETE 'http://localhost:8000/symptoms/1'
    Using app.post for delete because a lot of browsers won't take
    the delete method from a form now so you have to trick them
*/
app.post("/delete/:sid/", (req, res) => {
  console.log("we are in the delete");
  destroySymptom(req).then(symptoms => {
    // res.sendStatus(204);
    res.redirect(/symptoms/);

  });
});



module.exports = app;
