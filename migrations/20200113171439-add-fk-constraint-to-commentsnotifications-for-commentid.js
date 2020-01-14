'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'CommentsNotifications',
            ['comment_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'comment_id-fk-in-commentsnotifications',
                table: 'Comments',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'CommentsNotifications',
            'comment_id-fk-in-commentsnotifications'
        )
    }
};
