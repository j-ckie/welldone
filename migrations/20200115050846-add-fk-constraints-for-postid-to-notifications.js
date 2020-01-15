'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'Notifications',
            ['post_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'post_id-in-notifications',
                table: 'Posts',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'Notifications',
            'post_id-in-notifications'
        )
    }
};
