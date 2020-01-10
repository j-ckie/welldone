const models = require('../models')

//Grabs post and sends it to page
module.exports.getPost = (req,res,next) => {
  models.Posts.findByPk(req.query.post_id,{
    include: [
      {
        model: models.Comments,
        as: 'comment'
      }
    ]
  }).then(post => {
    let comments = post.comment
    res.render('post', {post: post, comments: comments})
  })
}

module.exports.addFavourite = (req,res,next) => {
  let favourite = models.Favourite.build({
    isFavourite: 'TRUE',
    post_id: req.body.post_id,
    user_id: 1
  })
  favourite.save().then(() => res.redirect('back'))
}
