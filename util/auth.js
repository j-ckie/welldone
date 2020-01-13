const authenticate = (req, res, next) => {
    if (req.session) {
        if (req.session.email) {
            next()
        } else {
            res.redirect("/login")
        }
    } else {
        res.redirect("/login")
    }
}

module.exports = authenticate;