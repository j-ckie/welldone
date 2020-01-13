'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('postImages')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.createTable('postImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.BLOB('long')
      },
      image_size: {
        type: Sequelize.INTEGER
      },
      image_name: {
        type: Sequelize.STRING
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Posts',
            key: 'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  }
};
