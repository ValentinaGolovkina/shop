var Good = require('model/good').Good;
var Cart = require('model/cart').Cart;
var HttpError = require('../error').HttpError;
var async = require('async');

exports.get = function(req, res,next) {
    var goodname = req.query.goodname;
    if(goodname!=undefined) {
        Good.findOne({goodname: goodname}, function (err, good) {
            if (err)  { next(new HttpError(500,"Ошибка поиска товара в БД с именем:"+goodname)); }
            else { res.render('description', {good: good}); }
        });
    }
    else{
        var size = req.query.size;
        var goodID =req.query.goodID;
        var userID = req.query.userID;
        if(userID!=undefined) {
            if(size!=undefined) {
                async.waterfall([
                    function(callback) {
                        Cart.findOne({userID: userID, goodID:goodID,size:size}, callback);
                    },
                    function(cart, next) {
                        if (cart) {
                            cart.count=cart.get('count')+1;
                        }else {
                            cart = new Cart({userID: userID,goodID: goodID,size: size, count: '1'});
                        }
                        cart.save(function(err) {
                            if (err) { next(new HttpError(500,"Ошибка сохранения корзины в БД")); }
                            else { res.status(200); }
                        });
                    }
                ], next);
            }
            else { next(new HttpError(401,"Ошибка не выбран размер")); }
        }
        else { next(new HttpError(402,"Ошибка пользователь не зарегистрирован")); }
        res.end();
    }
};