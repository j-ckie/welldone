const models = require('../models')

//Grabs post and sends it to page
module.exports.getPost = (req,res,next) => {
  models.Post.findByPk(postId,{
    include: [
      {
        model: models.Comment,
        as: 'comment'
      }
    ]
  }).then(post => {
    let comments = post.comment
    res.render('post', {post: post, comments: comments})
  })
}
