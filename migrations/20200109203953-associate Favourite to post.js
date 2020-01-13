'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Posts',
        'favourite_id',
        {
            type: Sequelize.INTEGER,
            references: {
                model: 'Favourites',
                key: 'id'
            }
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Posts', 'favourite_id')
  }
};
