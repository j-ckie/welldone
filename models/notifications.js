'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    type: DataTypes.STRING,
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    // sender_id: DataTypes.INTEGER
  }, {});
  Notifications.associate = function(models) {
    Notifications.belongsTo(models.Posts, {as: 'post',foreignKey: 'post_id'});
    // associations can be defined here
  };
  return Notifications;
};