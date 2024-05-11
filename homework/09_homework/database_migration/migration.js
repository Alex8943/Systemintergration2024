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
        console.log("Connection to shop db: ", old_connection.config.database);

        connection.connect();
        console.log("Connection successful to new_shop db: ", connection.config.database);

    }catch(err){
        console.error("Connection failed: ", err);
    } finally {
   
        await knex.destroy();
    }
}

/*
async function migrateFromShopToNewShop() {
    
    try {
      
        const [tables] = await old_connection.promise().query('SHOW TABLES'); 
        const tableNames = tables.map(table => table.Tables_in_shop);
        
       
       for (const table of tableNames) {
            const [rows] = await old_connection.promise().query(`SELECT * FROM ${table}`);
            console.log(`Table ${table}: `, rows);
        }
        

        const [newTables] = await connection.promise().query('SHOW TABLES');
        const newTableNames = newTables.map(table => table.Tables_in_new_shop);
        
        
        for (const table of newTableNames) {
            const [rows] = await connection.promise().query(`SELECT * FROM ${table}`);
            console.log(`Table new_shop.country`, rows);
        }
        
        
        const [shopUsers] = await old_connection.promise().query('SELECT * FROM users');
      
        for (const user of shopUsers) {
            await connection.promise().query('INSERT INTO users SET ?', user);
            console.log("User inserted new_shop.users: ", user);
        }
        

       
        const [new_shopUsers] = await old_connection.promise().query('SELECT * FROM users');

        const [shopCountry] = await old_connection.promise().query('SELECT * FROM country');

        const [newShopUsers] = await connection.promise().query('SELECT * FROM users');
        console.log("Users in new_shop.users: ", newShopUsers);

        const [newShopCountry] = await connection.promise().query('SELECT * FROM country');
        console.log("Country in new_shop.country: ", newShopCountry);

        if(JSON.stringify(shopUsers) === JSON.stringify(newShopUsers) && JSON.stringify(shopCountry) === JSON.stringify(newShopCountry))
            console.log("Migration successful");



    } catch (err) {
        console.error("Migration failed: ", err);
    }
}

*/

async function migrateFromShopToNewShop() {
    try{

        //Print out all tables and rows from old db 
        const [tables] = await old_connection.promise().query('SHOW TABLES');
        const tableNames = tables.map(table => table.Tables_in_shop);
        for(const table of tableNames){
            const [rows] = await old_connection.promise().query(`SELECT * FROM ${table}`);
            //console.log(`Table ${table}: `, rows);
        }



        //Paste all tables and rows from old db to new db
        for(const table of tableNames){
            const [rows] = await old_connection.promise().query(`SELECT * FROM ${table}`);
            for(const row of rows){
                await connection.promise().query(`INSERT INTO ${table} SET ?`, row);
                console.log(`Row inserted into new_shop.${table}: `, row);
            }
        }

    }catch(error){
        console.error("Migration failed: ", error);
    }
}



module.exports = {
    testConnection: testConnection,
    migrateFromShopToNewShop: migrateFromShopToNewShop
}
