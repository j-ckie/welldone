'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'LikesNotifications',
            ['sender_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'sender_id-fk-in-likesnotifications',
                table: 'Users',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'LikesNotifications',
            'sender_id-fk-in-likesnotifications'
        )
    }
};
