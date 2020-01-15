'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint(
            'Endpoints',
            ['user_id'], {
            type: 'FOREIGN KEY',
            references: {
                name: 'user_id-fk-in-endpoints-table',
                table: 'Users',
                field: 'id'
            }
        }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            'Endpoints',
            'user_id-fk-in-endpoints-table'
        )
    }
};
