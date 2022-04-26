'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('venicles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUIDV4
      },
      mark: {
        allowNull: false,
        type: DataTypes.STRING
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      chassis: {
        type: DataTypes.STRING,
        allowNull: false
      },
      engine: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'on_sale'
      }
    });
  },

  async down(queryInterface, _DataTypes) {
    await queryInterface.dropTable('venicles');
  }
};
