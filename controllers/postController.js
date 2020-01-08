const models = require ('./models')

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
