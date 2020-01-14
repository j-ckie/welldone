const models = require('../models')

//Grabs post and sends it to page
module.exports.getPost = (req, res, next) => {
    models.Posts.findByPk(req.query.post_id, {
        include: [
            {
                model: models.Comments,
                as: 'comment'
            }
        ]
    }).then(post => {
        let comments = post.comments
        res.render('post', { post: post, comments: comments })
    })
}

module.exports.addFavourite = (req, res, next) => {
    let favourite = models.Favourite.build({
        isFavourite: 'TRUE',
        post_id: req.body.post_id,
        user_id: 1
    })
    favourite.save().then(() => res.redirect('back'))
}

module.exports.addComment = (req, res, next) => {
    let comment = models.Comments.build({
        body: req.body.body,
        post_id: req.body.post_id,
        user_id: req.body.user_id
    })
    comment.save().then(() => res.redirect('back'))
}

module.exports.updateComment = (req, res, next) => {
    models.Comments.update({
        body: req.body.body
    }, {
        where: {
            id: req.body.comment_id
        }
    }).then(() => res.redirect('back'))
}

module.exports.deleteComment = (req, res, next) => {
    models.Comments.destroy({
        where: {
            id: req.body.comment_id
        }
    }).then(() => res.redirect('back'))
}
