const models = require("../models");

module.exports.getHomePage = async function(req, res) {
  let categories = await models.Categories.findAll()

  let aPost = await models.Posts.findAll({
   include:[
     {
     model: models.PostsWithCategories,
    include: [
      {
        model: models.Categories,
        as: "category"
      }
    ],
      as:"postswithcategories"
    },
      {
        model: models.Users,
        as: "user"
      } 
]
  })

  let popular = await models.Notifications.findAll().then()
//     include:[
//       {
//       model: models.Posts,   
//        as:"post"
//      }
//  ]
  //  ).then();
  // res.json(popular);
  // res.render('index', {categories:categories,aPost:aPost,popular:popular})  Working on
  //res.json()
  res.render('index', {categories: categories,aPost:aPost,user: req.session})
}
