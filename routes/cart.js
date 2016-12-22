/**
 * Created by Валентина on 18.12.2016.
 */

var async = require('async');
var Good = require('model/good').Good;
var Cart = require('model/cart').Cart;
exports.get = function(req, res,next) {
   var userID=req.query.userID;
    console.log("пользователь: ", userID);
    Cart.find({userID:userID},function (err, carts){
        if (err) {
            console.log("ошибка поиска  товара в корзине: ");
            next(err);
        }
        else {
            console.log("Считалась корзина!!!:");
            console.log(carts);
            var count=carts.length;
            console.log("кол-во товаров в корзине ",count);
            var goods=[];
            var k=0;
            async.waterfall([
                function(callback) {
                    async.each(carts, function(cartData) {
                        var goodID = cartData.get('goodID');
                        console.log("goodID=", goodID);
                        Good.findOne({_id: goodID}, function (err, good) {
                            if (err) {
                                console.log("ошибка поиска  товара: ");
                                next(err);
                            }
                            else {
                                console.log("Считался товар!!!:");
                                //console.log(good);
                                goods.push(good);
                                k++;
                                console.log("k++:! ",k);
                                //console.log("передаем товары в render:! ",goods);
                            }
                        });
                    });
                },
                function(callback) {
                    console.log("k==count: ",k,"=",count);
                    if (k==count)
                    {
                        console.log("передаем товары в render: ",goods);
                        res.render('cart', {goods: goods, count: goods.length});
                    }
                }

        ]);
        }
    });
};