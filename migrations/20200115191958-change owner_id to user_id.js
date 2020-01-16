'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Notifications','owner_id', 'user_id')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Notifications','user_id', 'owner_id')
  }
};
