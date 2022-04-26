'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('venicles', 'createdAt', {
      type: Sequelize.DATE,
      format: 'DD-MM-YYYY',
      allowNull: false,
    });
    await queryInterface.addColumn('venicles', 'updatedAt', {
      type: Sequelize.DATE,
      format: 'DD-MM-YYYY',
      allowNull: false,
    });
    await queryInterface.addColumn('sales', 'madeAt', {
      type: Sequelize.DATE,
      format: 'DD-MM-YYYY',
      allowNull: false,
    }, { after: 'value' });
    await queryInterface.addColumn('users', 'createdAt', {
      type: Sequelize.DATE,
      format: 'DD-MM-YYYY',
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'updatedAt', {
      type: Sequelize.DATE,
      format: 'DD-MM-YYYY',
      allowNull: false,
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn('venicles', 'createdAt');
    await queryInterface.removeColumn('venicles', 'updatedAt');
    await queryInterface.removeColumn('sales', 'createdAt');
    await queryInterface.removeColumn('sales', 'updatedAt');
    await queryInterface.removeColumn('users', 'createdAt');
    await queryInterface.removeColumn('users', 'updatedAt');
  }
};
