'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'LikesNotifications',
            ['recipient_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'recipient_id-fk-in-likesnotifications',
                table: 'Users',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'LikesNotifications',
            'recipient_id-fk-in-likesnotifications'
        )
    }
};
