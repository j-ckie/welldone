'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    category: DataTypes.STRING,
    post_id: DataTypes.INTEGER
  }, {});
  Categories.associate = function(models) {
    models.Categories.hasMany(models.PostsWithCategories, {as: 'postswithcategories',foreignKey: 'category_id'})
    // Categories.belongsTo(models.Posts, {as: 'post',foreignKey: 'post_id'})
    // associations can be defined here
  };
  return Categories;
};
