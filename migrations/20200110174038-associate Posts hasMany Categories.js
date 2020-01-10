'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Categories',
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
        return queryInterface.removeColumn('Categories', 'post_id')
    }
};
