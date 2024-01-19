'use strict';

const movies = require ('../database/movie.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = movies.map((el) => {
      el.createdAt = el.updatedAt = new Date ()
      el.AuthorId = "65531447fe01db5b8de4d073"
      return el
    })
    await queryInterface.bulkInsert('Movies', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null)
  }
};
