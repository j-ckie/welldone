'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    type: DataTypes.STRING,
    post_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Notifications.associate = function(models) {

    // associations can be defined here
    models.Notifications.belongsTo(models.Users, {as: 'user',foreignKey: 'user_id'})
    models.Notifications.belongsTo(models.Posts, {as: 'post',foreignKey: 'post_id'})
  };
  return Notifications;
};
