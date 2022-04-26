'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUIDV4
      },
      cpf: {
        allowNull: false,
        type: DataTypes.STRING
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      avatar: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      biography: {
        allowNull: false,
        type: DataTypes.STRING
      }
    });
  },

  async down(queryInterface, _DataTypes) {
    await queryInterface.dropTable('users');
  }
};