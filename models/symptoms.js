const knex = require("../db");

// CREATE
function createSymptom({ body: { symptom } }) {
  return knex("Symptoms")
    .returning("*")
    .insert({ symptom, });
}

// Find all
function findSymptoms() {
  return knex("symptoms");
}

// Find one
function findSymptom({ params: { sid } }) {
  return knex("symptoms").where("sid", sid);
}

// Update
function updateSymptom({ params: { sid }, body: { symptom } }) {
  return knex("symptoms")
    .where("sid", sid)
    .returning("*")
    .update({ symptom });
}

// Destroy
function destroySymptom({ params: { sid } }) {
  return knex("symptoms")
    .where("sid", sid)
    .del();
}

module.exports = {
  createSymptom,
  findSymptoms,
  findSymptom,
  updateSymptom,
  destroySymptom
};
