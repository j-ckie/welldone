'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Posts', 'category_id')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Posts',
        'category_id',
        {
            type: Sequelize.INTEGER,
            references: {
                model: 'Categories',
                key: 'id'
            }
        }
    )
  }
};
