'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'Notifications',
            ['sender_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'sender_id-fk-in-notifications',
                table: 'Users',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'Notifications',
            'sender_id-fk-in-notifications'
        )
    }
};
