const mysql2 = require('mysql2');
const dotenv = require('dotenv');
const knexfile = require('./knexfile');
const { Model } = require('objection');

const Knex = require('knex');

dotenv.config();

const connection = mysql2.createConnection({
    host: process.env.NEW_DB_HOST,
    port: process.env.NEW_DB_PORT,
    user: process.env.NEW_DB_USER,
    password: process.env.NEW_DB_PASSWORD,
    database: process.env.NEW_DB_NAME,
});


const old_connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


async function testConnection(){

    const knex = Knex(knexfile.development);
    Model.knex(knex);

    try{
        connection.connect();
        console.log("Connection successful to new_shop db: ", connection.config.database);
        
        console.log("Connection to shop db: ", old_connection.config.database);

        

    }catch(err){
        console.error("Connection failed: ", err);
    } finally {
   
        await knex.destroy();
    }
}


async function migrateFromShopToNewShop() {
    const knex = Knex(knexfile.development);
    Model.knex(knex);

    try {
    
        

      
    } catch (err) {
            
        console.error("Migration failed: ", err);
    }
}


module.exports = {
    testConnection: testConnection,
    migrateFromShopToNewShop: migrateFromShopToNewShop
}
