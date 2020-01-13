'use strict';
module.exports = (sequelize, DataTypes) => {
    const CommentsNotifications = sequelize.define('CommentsNotifications', {
        type: DataTypes.STRING,
        recipient_id: DataTypes.INTEGER,
        sender_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,
        comment_id: DataTypes.INTEGER
    }, {});
    CommentsNotifications.associate = function (models) {
        // associations can be defined here
        models.CommentsNotifications.belongsTo(models.Users, { as: 'recipient', foreignKey: 'recipient_id' })
        models.CommentsNotifications.belongsTo(models.Posts, { as: 'post', foreignKey: 'post_id' })
        models.CommentsNotifications.belongsTo(models.Comments, { as: 'comment', foreignKey: 'comment_id' })

    };
    return CommentsNotifications;
};