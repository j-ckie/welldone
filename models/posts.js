'use strict';
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        user_id: DataTypes.INTEGER
    }, {});
    Posts.associate = function (models) {
        // associations can be defined here
        models.Posts.belongsTo(models.Users, {as: 'user',foreignKey: 'user_id'})
        models.Posts.hasMany(models.Comments, {as: 'comment',foreignKey: 'post_id'})
    };
    return Posts;
};
