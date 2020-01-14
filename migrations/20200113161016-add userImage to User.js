'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Users',
        'user_image',
        {
            type: Sequelize.BLOB
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users','user_image')
  }
};
