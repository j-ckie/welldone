const notififyUser = (req) => {
    let postId = req.body.postId,
        ownerId = req.body.ownerId,
        type = req.body.type
    // console.log(postId)
    // console.log(ownerId)

    // find name of likeR
    models.Users.findOne({
        where: {
            email: req.session.email
        }
    })
        .then(persistedUser => {
            let name = persistedUser.name,
                senderId = persistedUser.id;

            // build entry on Notifications table
            let newNotification = models.Notifications.build({
                type: type,
                owner_id: ownerId,
                sender_id: senderId,
                post_id: postId
            });

            newNotification.save().then(() => res.status(201)).catch(err => console.error(err))

            // look for endpoints table to find user specific endpoints

            models.Endpoints.findAll({
                where: {
                    user_id: ownerId
                }
            })
                .then(data => {
                    data.forEach(endpoint => {
                        const payload = JSON.stringify({
                            title: `${name} has liked your post.`
                        });
                        let remote = JSON.parse(endpoint.endpoint_data) // remote endpoint
                        console.log("pushing to" + remote)
                        webpush.sendNotification(remote, payload)
                    })
                }).catch(err => console.error(err))
        }).catch(err => console.error(err))
}
