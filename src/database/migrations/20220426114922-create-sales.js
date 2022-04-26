'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      venicle_id: {
        allowNull: false,
        type: DataTypes.UUIDV4,
        references: {
          model: 'venicles',
          key: 'id'
        }
      },
      saler_id: {
        allowNull: false,
        type: DataTypes.UUIDV4,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('sold', 'reserved'),
        defaultValue: 'sold'
      },
      value: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
