const models = require('../models')

module.exports.getCategories = async function (req,res) {

  let categories = await models.Categories.findAll()
  
  let aPost = await models.Posts.findAll({
    include: 
    [
      {
        model: models.PostsWithCategories,
          include:[
          {
            model: models.Categories,
            as: 'category'        
          }
          ],
          as: 'postswithcategories'       
      },
      {
        model:models.Users,
        as: 'user'
      }
      
    ] 
})

let categoryId = req.params.categoryId
  let category = await models.Categories.findAll({
      include:[
          {
              model:models.PostsWithCategories,
              include:[
                {
                model:models.Posts,
                include:[
                {
                  model: models.Users,
                  as: "user"
                },
                {
                  model: models.PostImage,
                  as: 'postImage'
                }
              ],
                as:'post'
                },
              ],
              as: 'postswithcategories'
          }       
      ],
      where:{
           category:categoryId
       }
  })


  res.render('category',{categories:categories,aPost:aPost,category:category,postswithcategories:category.postswithcategories,post:category.post,user:category.user})
  
}
