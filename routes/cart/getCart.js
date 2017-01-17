/**
 * Created by Валентина on 14.01.2017.
 */
var Cart = require('model/cart').Cart;
var Good = require('model/good').Good;
exports.get = function (req, res, next) {
    var userID=req.session.user;
    Cart.find({userID: userID}, function (err, carts) {
        if (err)  next(new HttpError(500, "Ошибка поиска корзины для пользователя в БД"));
        else res.render('cart', {goods: carts});
    });
};