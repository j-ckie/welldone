const models = require('../models')
const sequelize = require("sequelize");

module.exports.getHomePage = async function (req,res) {

  let categories = await models.Categories.findAll().then()

  res.render('index', {categories: categories})
}
