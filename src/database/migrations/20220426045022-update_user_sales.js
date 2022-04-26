'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'sales', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn('users', 'reservations', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn('users', 'sales');
    await queryInterface.removeColumn('users', 'reservations');
  }
};
