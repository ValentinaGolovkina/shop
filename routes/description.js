var Good = require('model/good').Good;
var HttpError = require('../error').HttpError;

exports.get = function (req, res, next) {
    var goodname = req.query.goodname;
    Good.findOne({goodname: goodname}, function (err, good) {
        if (err) next(new HttpError(500, "Ошибка поиска товара в БД с именем:" + goodname));
        else res.render('description', {good: good});
    });
};