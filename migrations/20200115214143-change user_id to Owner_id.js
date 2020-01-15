'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Notifications','sender_id', 'user_id')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Notifications','user_id', 'sender_id')
  }
};
