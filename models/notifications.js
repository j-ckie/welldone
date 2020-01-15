'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notifications = sequelize.define('Notifications', {
        type: DataTypes.STRING,
        recipient_id: DataTypes.INTEGER,
        sender_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER
    }, {});
    Notifications.associate = function (models) {
        // associations can be defined here
        models.Notifications.belongsTo(models.Users, { as: 'recipient', foreignKey: 'recipient_id' })
        models.Notifications.belongsTo(models.Posts, { as: 'post', foreignKey: 'post_id' })
    };
    return Notifications;
};