'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'CommentsNotifications',
            ['recipient_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'recipient_id-fk-in-commentsnotifications',
                table: 'Users',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'CommentsNotifications',
            'recipient_id-fk-in-commentsnotifications'
        )
    }
};
