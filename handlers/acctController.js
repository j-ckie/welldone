const models = require('../models')

//Grabs Users Posts and sends them to Page
module.exports.getYourPostsandFavourites = (req,res,next) => {
  models.Users.findByPk(1, {
    include: [
      {
        model: models.Posts,
        as: 'post'
      }
    ]
  }).then(user => {
    if(user != null){
      //if user does exist
      let usersPosts = user.post
      res.render('acct', {userPosts: usersPosts/*, favouritePosts: usersFavourites*/})

    } else {
      //If the user does not exist
      res.redirect('/login')
    }
  })
}

/*
let usersFavourites = []
models.Users.findByPk(1, {
  include: [
    {
      model: models.Favourites,
      as: 'favourite'
    }
  ]
}).then(user => {
  //Grabs Favourites and sends them to the page
  let favourites = user.favourite
  for(let i = 0; i < favourites.length; i++) {
    models.Posts.findByPk(1,{
      include: [
        {
          model: models.Comments,
          as: 'comment'
        }
      ]
    }).then(post => {
      let comments = post.comment
      post.comments = parseInt(comments.length)
      usersFavourites.push(post)
    })
  }
})
*/


//Creates Post and sends it to database
module.exports.postToYourPosts = (req,res,next) => {
  let post = models.Posts.build({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id
  })
  post.save().then(() => res.redirect('/acct'))
}

//Grabs Post and Deletes it from database
module.exports.deleteFromYourPosts = (req,res,next) => {
  models.Posts.destroy({
    where: {
      id: req.body.post_id
    }
  }).then(() => res.redirect('/acct'))
}

//Grabs Post and Updates it from database
module.exports.updateFromYourPosts = (req,res,next) => {
  models.Posts.update({
    title: req.body.title,
    body: req.body.body,
    category: req.body.category
  }, {
    where: {
      id: req.body.post_id
    }
  }).then(() => res.redirect('/acct'))
}

//Grabs Favourite and Removes it from Your Favourites
module.exports.removeFromYourFavourites = (req,res,next) => {
  models.Favourites.destroy({
    where: {
      id: req.body.favouriteId
    }
  }).then(() => res.redirect('/acct'))
}
