'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    isFavourite: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {});
  Favourite.associate = function(models) {
    Favourite.belongsTo(models.Users, {as: 'user',foreignKey: 'user_id'});
    Favourite.belongsTo(models.Posts, {as: 'post',foreignKey: 'post_id'});
  };
  return Favourite;
};
