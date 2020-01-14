'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'LikesNotifications',
            ['post_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'post_id-fk-in-likesnotifications',
                table: 'Posts',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'LikesNotifications',
            'post_id-fk-in-likesnotifications'
        )
    }
};
