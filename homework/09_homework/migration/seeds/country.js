/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// seeds/initial_data.js

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('country').del()
    .then(function () {
      // Inserts seed entries
      return knex('country').insert([
        { id: 1, name: 'USA'},
        { id: 2, name: 'Mexico'},
        {id: 3, name: 'Canada'}
      ]);
      
    });
};


