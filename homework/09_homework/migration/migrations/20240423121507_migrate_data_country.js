/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Select data from users table in shop database
    const userData = await knex.select('*').from('users').inTable('country');

    // Insert data into users table in new_shop database
    await knex.batchInsert('users', userData).inTable('new_shop');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
