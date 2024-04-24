/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Select data from users table in shop database
    const userData = await knex.select('*').from('users');

    //Check if the new_shop database exists
    
    // Insert data into users table in new_shop database
    await knex('new_shop.users').insert(userData);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    // Rollback logic (if needed)
};
