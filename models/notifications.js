'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    type: DataTypes.STRING,
    post_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER
  }, {});
  Notifications.associate = function(models) {
    // associations can be defined here
  };
  return Notifications;
};