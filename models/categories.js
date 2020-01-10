'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    category: DataTypes.STRING
  }, {});
  Categories.associate = function(models) {
    models.Categories.hasMany(models.PostsWithCategories, {as: 'postswithcategories',foreignKey: 'category_id'})
    // associations can be defined here
  };
  return Categories;
};
