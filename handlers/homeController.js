const models = require('../models')
const sequelize = require("sequelize");

module.exports.getHomePage = async function (req,res) {

  let categories = await models.Categories.findAll().then()

  let popular = await models.Posts.findAll({
    include: [
      {
        model: models.Favourite,
        as: 'favourite'
      }
    ]
  }).then()

  res.json(popular)
  //res.render('index', {categories: categories, popular: popular})
}
