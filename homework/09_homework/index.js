const knexfile = require('./knexfile');
const { Model } = require('objection');
const Countries = require("./models/country");
const Users = require("./models/users");
const Knex = require('knex');

async function testDBConnection() {

    const knex = Knex(knexfile.development);
    Model.knex(knex);

    try {
        await Countries.query();
        await Users.query();
    
        console.log('Both database connections are successful.');

    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
   
        await knex.destroy();
    }
}

testDBConnection();
