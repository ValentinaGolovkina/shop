/**
 * Created by Валентина on 13.11.2016.
 */
exports.get = function(req, res) {
    res.render('login');
};

var User = require('model/user').User;
var HttpError = require('../../error/index').HttpError;
exports.post = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    User.authorize(email, password, function(err, user) {
        if (err)  { next(new HttpError(401,"Ошибка авторизации")); }
        else {
            console.log("успешный вход");
            req.session.user = user._id;
            res.end();
        }
    });
};
