const knexfile = require('./knexfile');
const { Model } = require('objection');
const Countries = require("./models/country");
const Users = require("./models/users");
const Knex = require('knex');

async function testDBConnection() {

    // Set up Knex and Objection.js with the database configuration from knexfile.js
    const knex = Knex(knexfile.development);
    Model.knex(knex);

    try {
    
        const countries = await Countries.query();

        const users = await Users.query();
    
        console.log('Both database connections are successful.');

    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        // Destroy connection
        await knex.destroy();
    }
}

testDBConnection();
