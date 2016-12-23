/**
 * Created by Валентина on 18.12.2016.
 */
var Good = require('model/good').Good;
var Cart = require('model/cart').Cart;
exports.get = function(req, res,next) {
   var userID=req.query.userID;
    console.log("пользователь для корзины: ", userID);
    var goodid=req.query.goodID;
    console.log("товар для удаления: ", goodid);
    var sizeD=req.query.size;
    console.log("размер товара для удаления: ", sizeD);
    if(goodid!=undefined){
        Cart.findOne({userID:userID, goodID:goodid, size:sizeD},function (err, cart){
            if (err) {
                console.log("ошибка поиска корзины для пользователя: ");
                next(err);
            }
            else {
                if(cart){
                if(cart.get('count')>1){
                    cart.count=cart.get('count')-1;
                    cart.save(function(err) {
                        if (err) return next(err);
                    });
                    console.log("Уменьшили количество товара:", cart.get('count'));
                }
                else{
                    Cart.remove({userID:userID, goodID:goodid, size:sizeD},function (err) {
                        if (err) {
                            console.log("ошибка удаления товара из корзины: ");
                            next(err);
                        }
                        else {
                            console.log("успешное удаление товара из корзины: ");
                        }
                    });
                }}
            }
        });
    }
    Cart.find({userID:userID},function (err, carts){
        if (err) {
            console.log("ошибка поиска корзины для пользователя: ");
            next(err);
        }
        else {
            console.log("Считалась корзина!!!:");
            //console.log(carts);
            var count=carts.length;
            console.log("кол-во товаров в корзине ",count);
            var goods=[];
            if(count==0){
                res.render('cart', {goods:goods,count: 0});
            }
            else{
            var k=0;
            for (var i = 0; i < count; i++) {
                var goodId = carts[i].get('goodID');
                Good.findOne({_id: goodId}, function (err, good) {
                    if (err) {
                        console.log("ошибка поиска  товара: ");
                        next(err);
                    }
                    else {
                        console.log("Считался товар!!!:",good.get('_id'));
                        goods.push(good);
                        k=k+1;
                        console.log("k==count: ",k,"=",count);
                        if (k==count)
                        {
                            //console.log("Зашло в условие k==count: ",k,"=",count);
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
};