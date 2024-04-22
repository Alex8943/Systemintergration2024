/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

    const hasCountryTable = await knex.schema.hasTable('country');
        await knex.schema.createTable('country', function(table){
            table.increments('id').primary();
            table.string('name').notNullable();
            table.timestamps(true, true);
        });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('country');
};
