'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('users', 'isAdmin', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn('users', 'isAdmin');
  }
};
