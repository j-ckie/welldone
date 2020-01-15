const models = require('../models')


module.exports.getHomePage = async function (req,res) {

  let categories = await models.Categories.findAll()

  // let whichPost = await models.Posts.findAll({
  //   where:{
  //     id: [28,29,30]
  //   }
  // }).then()
  
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
  res.render('index', {categories: categories,aPost:aPost})

  
}
