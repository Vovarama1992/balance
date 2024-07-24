export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10000,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};