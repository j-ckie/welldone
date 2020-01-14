const models = require("../models")

 module.exports.getCategories = async function(req,res){
   
   let categories = await models.Categories.findAll().then()
   
    res.render('/',{categories:categories})
 }