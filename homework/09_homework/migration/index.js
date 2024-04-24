const knexfile = require('./knexfile');
const { Model } = require('objection');
const Countries = require("./models/country");
const Users = require("./models/users");
const Knex = require('knex');

async function testDBConnection() {

    const knex = Knex(knexfile.development);
    Model.knex(knex);

    try {
        const countryResult = await Countries.query();
        const usersResult = await Users.query();
    
        console.log('Shop database connection is successful.');

        console.log('Users: ', usersResult);
        console.log('Countries: ', countryResult);
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
   
        await knex.destroy();
    }
}

testDBConnection();
