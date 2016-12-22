/**
 * Created by Валентина on 13.11.2016.
 */
var User = require('model/user').User;
var HttpError = require('error').HttpError;
var AuthError = require('model/user').AuthError;
var async = require('async');

exports.get = function(req, res) {
    res.render('login');
};

exports.post = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.authorize(email, password, function(err, user) {
        if (err) {
            console.log("ошибка авторизации");
            res.status(401);
            res.end();
        }
        else {
            console.log("успешный вход");
            req.session.user = user._id;
            //res.render('1');
            res.end();
        }
    });
};
