'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'CommentsNotifications',
            ['sender_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'sender_id-fk-in-commentsnotifications',
                table: 'Users',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'CommentsNotifications',
            'sender_id-fk-in-commentsnotifications'
        )
    }
};
