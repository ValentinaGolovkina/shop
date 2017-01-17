/**
 * Created by Валентина on 17.11.2016.
 */
exports.get = function(req, res) {
    res.render('registration');
};

var async = require('async');
var User = require('model/user').User;
var HttpError = require('../../error/index').HttpError;
exports.post = function(req, res, next) {
    var email = req.body.email;
    var username = req.body.username;
    var surname = req.body.surname;
    var password = req.body.password;

    async.waterfall([
        function(callback) {
            User.findOne({email: email}, callback);
        },
        function(user, callback) {
            if (user) {
                next (new HttpError(401,"Такой email уже зарегистрирован"));
            }else {
                user = new User({email: email,username: username,surname: surname, password: password});
                user.save(function(err) {
                    if (err) return callback(err);
                    res.end();
                });
            }
        }
    ], next);
};
