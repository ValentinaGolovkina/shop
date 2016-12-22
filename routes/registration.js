/**
 * Created by Валентина on 17.11.2016.
 */
var User = require('model/user').User;
exports.get = function(req, res) {
    res.render('registration');
};

exports.post = function(req, res, next) {
    var email = req.body.email;
    var username = req.body.username;
    var surname = req.body.surname;
    var password = req.body.password;

    User.registr(email, username, surname, password, function(err, user) {
        if (err) {
            console.log("ошибка регистрации");
            res.status(401);
            res.end();
        }
        else {
            console.log("успешная регистрация");
            res.end();
        }
    });
};
