'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        body: DataTypes.TEXT,
        post_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER
    }, {});
    Comments.associate = function (models) {
        // associations can be defined here
        Comments.belongsTo(models.Posts, {as: 'post',foreignKey: 'post_id'})
        Comments.belongsTo(models.Users, {as: 'user',foreignKey: 'user_id'})
    };
    return Comments;
};
