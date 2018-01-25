module.exports = {
  up(knex, Promise) {
    return knex.schema.createTable('symptoms', (table) => {
      table.increments('sid');
      table.text('symptom').notNull();
    });
  },
  down(knex, Promise) {
    return knex.schema.dropTable('symptoms');
  }
}
