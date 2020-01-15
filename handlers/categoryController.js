const models = require('../models')
var whereStatement = {}
module.exports.getCategories = async function (req,res) {

  let categories = await models.Categories.findAll()
  
  let aPost = await models.Posts.findAll({
    include: 
    [
      {
        model: models.Categories,
        as: 'category'
          
      },
      {
        model:models.Users,
        as: 'user'
      }
      
    ] 
}).then()
  res.render('category',{categories:categories,aPost:aPost})
  
}