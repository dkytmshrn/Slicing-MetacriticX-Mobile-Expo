'use strict';

const genres = require ('../database/genre.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = genres.map((el) => {
      el.createdAt = el.updatedAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert('Genres', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null)
  }
};
