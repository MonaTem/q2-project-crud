
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('formulas').del()
  .then(() => {
    return knex('symptoms').del();
  })
  .then(() => {
      // Inserts seed entries
      return Promise.all([
      knex.raw(
        'INSERT INTO formulas (english_name, pinyin_name) VALUES (?, ?)',
        ["Meridian Circulation", "Du Huo Ji Sheng Tang"]
      ),
      knex.raw(
        'INSERT INTO formulas (english_name, pinyin_name) VALUES (?, ?)',
        ["Relaxed Wanderer", "Xiao Yao San"]
      ),
      knex.raw(
        'INSERT INTO formulas (english_name, pinyin_name) VALUES (?, ?)',
        ["Wise Judge", "Sha Shen Mai Dong Yin"]
      ),
      knex.raw(
        'INSERT INTO formulas (english_name, pinyin_name) VALUES (?, ?)',
        ["Compassionate Sage", "Hu Po Yang Xin Dan"]
      ),
      knex.raw(
        'INSERT INTO formulas (english_name, pinyin_name) VALUES (?, ?)',
        ["Dynamic Warrior", "Jin Gui Shen Qi Wan"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["arthritis"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["joint pain"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["muscle spasms"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["worse in wind, cold, and damp"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["sciatica"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["depression"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["heart palpitations"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["low back pain"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["anxiety"]
      ),
      knex.raw(
        'INSERT INTO symptoms (symptom) VALUES (?)',
        ["grief"]
      )
    ]);
  });
};
