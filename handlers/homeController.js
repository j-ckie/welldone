const models = require("../models");

module.exports.getHomePage = async function(req, res) {
  ///Working On
//  let list=[]
//   let categories = await models.Notifications.findAll().then(data=>{data.forEach(notification=>{
//     let type = notification.type
//     let postid = notification.post_id
//     if(type == "like"){
//       list.push({type,postid})
//     }
//     list.sort((a,b)=>(a.postid>b.postid)? -1:1)
//     // console.log(type, postid)
//   })
//   console.log(list)

// }).then(list=>{list.forEach(item=>{
//   let newpostid = postid
//   if(newpostid = postid)
// })})
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

  let popular = await models.Posts.findAll(
    {
    include:[
      {
      model: models.Notifications,   
       as:"notification"
     }
 ]
}
).then();
  // res.json(popular);
  // res.render('index', {categories:categories,aPost:aPost,popular:popular})  

  res.render('index', {categories: categories,aPost:aPost,popular:popular,user: req.session})
}
