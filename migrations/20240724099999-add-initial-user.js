/* eslint-disable no-unused-vars */
export default {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [{
        balance: 10000,
      }]);
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
    },
  };