const models = require ('./models')

module.exports.getYourPosts = (req,res,next) => {
  models.User.getByPk(userId, {
    include: [
      {
        model: models.Post,
        as: 'post'
      }
    ]
  }).then(user => {
    let usersPosts = user.post
    models.Post.getByPk(userId, {
      include: [
        {
          model: models.Comment,
          as: 'comment'
        }
      ]
    }).then(post => {
      let comments = post.comment
      usersPosts.comments = parseInt(comments.length)
    })
    res.render('acct', {userPosts: usersPosts})
  })
}

module.exports.getYourFavourites = (req,res,next) => {
  models.User.getByPk(userId, {
    include: [
      {
        model: models.Favourite,
        as: 'favourite'
      }
    ]
  }).then(user => {
    let usersFavourites = []
    let favourites = user.favourite
    for(let i = 0; i < favourites.length; i++) {
      models.Post.getByPk(favourites[i],{
        include: [
          {
            model: models.Comment,
            as: 'comment'
          }
        ]
      }).then(post => {
        let comments = post.comment
        post.comments = parseInt(comments.length)
        usersFavourites.push(post)
      })
    }
    res.render('acct', {favouritePosts: usersFavourites})
  })
}
