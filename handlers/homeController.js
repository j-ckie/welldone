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

  //user
  let user_id = await models.Users.findOne({
    where: {
        email: req.session.email
      }
  })

  //categories
  let categories = await models.Categories.findAll()

  //all posts
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
      }, {
        model: models.Users,
        as: "user"
      }, {
        model: models.PostImage,
        as: 'postImage'
      }
    ]
  })

  //adds notifications to post and cross checks the users like with the posts
  for(let i = 0; i < aPost.length; i++){
    let likes = await models.Notifications.findAll({
      where: {
        post_id: aPost[i].id,
        type: 'like'
      }
    })

    aPost[i].likes = likes

    //finds if user liked post
    let liked = await models.Notifications.findOne({
      where: {
        user_id: user_id.id,
        type: 'like',
        post_id: aPost[i].id
      }
    })

    aPost[i].liked = liked

    //determines which button to show
    if(liked != null) {
      aPost[i].hideAdd = 'hidden'
    } else {
      aPost[i].hideRemove = 'hidden'
    }
  }

  //finds posts for popular
  let popular = await models.Posts.findAll(
    {
      include:[
        {
          model: models.Notifications,
          as:"notification",
          where: {
            type: 'like'
          }

        },{
          model: models.PostImage,
          as: 'postImage'
        }
      ]
    }
  )

  //sorts posts by most likes
  popular.sort(function(a, b) {
    return a.notification.length - b.notification.length;
  })

  //reverses the posts to highest to lowest
  popular.reverse()

  let topten = []

  //grabs the 8 most popular
  for(let i = 0; i < 8; i++){
    topten.push(popular[i])
  }

  //res.json(aPost);
  res.render('index', {categories: categories, aPost:aPost, popular:topten, user: user_id})
}
