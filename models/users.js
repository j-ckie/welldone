'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    user_image: DataTypes.BLOB
  }, {});
  Users.associate = function(models) {
    models.Users.hasMany(models.Posts,{as: 'post', foreignKey: 'user_id'})
    models.Users.hasMany(models.Favourite,{as: 'favourite', foreignKey: 'user_id'})
    // associations can be defined here
  };
  return Users;
};
