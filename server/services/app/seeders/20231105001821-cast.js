'use strict';

const casts = require ('../database/cast.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = casts.map((el) => {
      el.createdAt = el.updatedAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert('Casts', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Casts', null)
  }
};
