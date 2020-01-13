'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostImage = sequelize.define('PostImage', {
    imageURL: DataTypes.STRING,
    post_id: DataTypes.INTEGER
  }, {});
  PostImage.associate = function(models) {
    PostImage.belongsTo(models.Posts, {as: 'post',foreignKey: 'post_id'})
    // associations can be defined here
  };
  return PostImage;
};
