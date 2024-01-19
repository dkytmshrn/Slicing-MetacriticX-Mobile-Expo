'use strict';

const { makeItLow } = require('../Helpers/toLower');
const {hashPassword} = require ('../Helpers/bcrypt');
const users = require ('../database/user.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = users.map((el) => {
      el.email = makeItLow(el.email)
      el.password = hashPassword(el.password)
      el.createdAt = el.updatedAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
};
