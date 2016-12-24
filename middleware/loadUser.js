/**
 * Created by Валентина on 13.11.2016.
 */
var User = require('model/user').User;

module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    if (!req.session.user)   return next();

    User.findById(req.session.user, function(err, user) {
        if (err) return next(err);
        req.user = res.locals.user = user;
        next();
    });
};