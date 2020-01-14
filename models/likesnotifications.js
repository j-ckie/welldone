'use strict';
module.exports = (sequelize, DataTypes) => {
    const LikesNotifications = sequelize.define('LikesNotifications', {
        type: DataTypes.STRING,
        recipient_id: DataTypes.INTEGER,
        sender_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER
    }, {});
    LikesNotifications.associate = function (models) {
        // associations can be defined here
        models.LikesNotifications.belongsTo(models.Users, { as: 'recipient', foreignKey: 'recipient_id' })
        models.LikesNotifications.belongsTo(models.Posts, { as: 'post', foreignKey: 'post_id' })
    };
    return LikesNotifications;
};