const knex = require("../db");

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
  console.log("we are in updateFormula function " + fid + " " + english_name + " " + pinyin_name);
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

module.exports = {
  createFormula,
  findFormulas,
  findFormula,
  updateFormula,
  destroyFormula
};
