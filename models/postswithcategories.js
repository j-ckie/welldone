'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostsWithCategories = sequelize.define('PostsWithCategories', {
    category_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {});
  PostsWithCategories.associate = function(models) {
    models.PostsWithCategories.belongsTo(models.Categories, {as: 'category',foreignKey: 'category_id'})
    models.PostsWithCategories.belongsTo(models.Posts, {as: 'post',foreignKey: 'post_id'})
    // associations can be defined here
  };
  return PostsWithCategories;
};
