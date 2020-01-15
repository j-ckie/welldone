'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'Notifications',
            ['owner_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'owner_id-in-notifications-table',
                table: 'Users',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'Notifications',
            'owner_id-in-notifications-table'
        )
    }
};
