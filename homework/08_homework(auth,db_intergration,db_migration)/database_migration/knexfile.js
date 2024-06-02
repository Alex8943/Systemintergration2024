const dotenv = require('dotenv');
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }
  }, 

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.NEW_DB_HOST,
      port: process.env.NEW_DB_PORT,
      user: process.env.NEW_DB_USER,
      password: process.env.NEW_DB_PASSWORD,
      database: process.env.NEW_DB_NAME,
    }
  }
};






  