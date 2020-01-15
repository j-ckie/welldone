const models = require('../models')
const sequelize = require("sequelize");

module.exports.getHomePage = async function (req,res) {

  let categories = await models.Categories.findAll().then()

  //res.json()
  res.render('index', {categories: categories, user: req.session})
}
