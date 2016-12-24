/**
 * Created by Валентина on 18.12.2016.
 */
var Good = require('model/good').Good;
var Cart = require('model/cart').Cart;
var HttpError = require('../error').HttpError;
exports.get = function(req, res,next) {
   var userID=req.query.userID;
    var goodid=req.query.goodID;
    var sizeD=req.query.size;
    if(goodid!=undefined){
        Cart.findOne({userID:userID, goodID:goodid, size:sizeD},function (err, cart){
            if (err) { next(new HttpError(500,"Ошибка поиска корзины для пользователя")); }
            else {
                if(cart){
                if(cart.get('count')>1){
                    cart.count=cart.get('count')-1;
                    cart.save(function(err) {
                        if (err) { next(new HttpError(500,"Ошибка сохранения корзины в БД")); }
                        else { console.log("успешное уменьшение количества товара в корзине"); }
                    });
                }
                else{
                    Cart.remove({userID:userID, goodID:goodid, size:sizeD},function (err) {
                        if (err) { next(new HttpError(500,"Ошибка ошибка удаления товара из корзины в БД")); }
                        else { console.log("успешное удаление товара из корзины"); }
                    });
                }
                    Cart.find({userID:userID},function (err, carts){
                        if (err) { next(new HttpError(500,"Ошибка поиска корзины для пользователя в БД")); }
                        else {
                            var count=carts.length;
                            var goods=[];
                            if(count==0){
                                res.render('cart', {goods:goods,count: 0});
                            }
                            else{
                                var k=0;
                                for (var i = 0; i < count; i++) {
                                    var goodId = carts[i].get('goodID');
                                    Good.findOne({_id: goodId}, function (err, good) {
                                        if (err) { next(new HttpError(500,"Ошибка поиска товара в БД")); }
                                        else {
                                            goods.push(good);
                                            k=k+1;
                                            if (k==count)
                                            {
                                                var goodOK=[];
                                                var counts=[];
                                                for(var j=0; j<count; j++)
                                                {
                                                    var l=0;
                                                    while (carts[j].get('goodID')!=goods[l].get('_id'))
                                                    {
                                                        l++;
                                                    }
                                                    goods[l].size=carts[j].get('size');
                                                    goodOK.push(goods[l]);
                                                    counts.push(carts[j].get('count'));
                                                    goods[l]=goods[goods.length-1];
                                                    goods.pop();
                                                }
                                                res.render('cart', {goods: goodOK, count: goodOK.length, counts:counts});
                                            }
                                        }
                                    });
                                }}
                        }
                    });
                }
            }
        });
    }
    else {
        Cart.find({userID: userID}, function (err, carts) {
            if (err) {
                next(new HttpError(500, "Ошибка поиска корзины для пользователя в БД"));
            }
            else {
                var count = carts.length;
                var goods = [];
                if (count == 0) {
                    res.render('cart', {goods: goods, count: 0});
                }
                else {
                    var k = 0;
                    for (var i = 0; i < count; i++) {
                        var goodId = carts[i].get('goodID');
                        Good.findOne({_id: goodId}, function (err, good) {
                            if (err) {
                                next(new HttpError(500, "Ошибка поиска товара в БД"));
                            }
                            else {
                                goods.push(good);
                                k = k + 1;
                                if (k == count) {
                                    var goodOK = [];
                                    var counts = [];
                                    for (var j = 0; j < count; j++) {
                                        var l = 0;
                                        while (carts[j].get('goodID') != goods[l].get('_id')) {
                                            l++;
                                        }
                                        goods[l].size = carts[j].get('size');
                                        goodOK.push(goods[l]);
                                        counts.push(carts[j].get('count'));
                                        goods[l] = goods[goods.length - 1];
                                        goods.pop();
                                    }
                                    res.render('cart', {goods: goodOK, count: goodOK.length, counts: counts});
                                }
                            }
                        });
                    }
                }
            }
        });
    }
};