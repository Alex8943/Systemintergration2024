exports.up = async function(knex) {
      await knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.timestamps(true, true);
      });
};

  
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users');    
};
  