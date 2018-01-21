
module.exports = {
  up(knex, Promise) {
    return knex.schema.createTable('formuals', (table) => {
      table.increments();
      table.text('english_name').notNull();
      table.text('pinyin_name');
    });
  },
  down(knex, Promise) {
    return knex.schema.dropTable('formulas');
  }
}
