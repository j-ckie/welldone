'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'CommentsNotifications',
            ['post_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'post_id-fk-in-commentsnotifications',
                table: 'Posts',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'CommentsNotifications',
            'post_id-fk-in-commentsnotifications'
        )
    }
};
