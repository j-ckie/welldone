'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Favourites',
        'post_id',
        {
            type: Sequelize.INTEGER,
            references: {
                model: 'Posts',
                key: 'id'
            }
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Favourite', 'post_id')
  }
};
