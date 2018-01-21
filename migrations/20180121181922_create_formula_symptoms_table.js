module.exports = {
  up(knex, Promise) {
    return knex.schema.createTable('formula_symptoms', (table) => {
      integer('fid')
        .references('formulas')
        .notNull()
        .onDelete('cascade')
        .index();
      integer('sid')
          .references('symptoms')
          .notNull()
          .onDelete('cascade')
          .index();
      table.text('english_name').notNull();
      table.text('pinyin_name');
      table.text('symptom').notNull();
    });
  },
  down(knex, Promise) {
    return knex.schema.dropTable('formula_symptoms');
  }
}
