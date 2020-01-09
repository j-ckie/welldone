'use strict';
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        title: DataTypes.STRING,
        body: DataTypes.TEXT
    }, {});
    Posts.associate = function (models) {
        // associations can be defined here
        Posts.belongsTo(models.Users, {
            as: 'Users',
            foreignKey: 'id'
        })
    };
    return Posts;
};