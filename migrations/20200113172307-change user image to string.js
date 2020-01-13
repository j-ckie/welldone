'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users','user_image',{
      type: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users','user_image',{
      type: Sequelize.BLOB
    })
  }
};
