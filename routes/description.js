var Good = require('model/good').Good;
//var User = require('model/user').User;
var Cart = require('model/cart').Cart;
//var mongoose = require('libs/mongoose');

exports.get = function(req, res,next) {
    console.log("GET ");
    var goodname = req.query.goodname;
    console.log("Считалось goodname:",goodname);
    if(goodname!=undefined) {
        Good.findOne({goodname: goodname}, function (err, good) {
            if (err) {
                console.log("ошибка считывания description");
                next(err);
            }
            else {
                console.log("Считалось descriptionOK:");
                console.log(good);
                res.render('description', {good: good})
            }
        });
    }
    else{
        var size = req.query.size;
        console.log("Считалось size:", size);
        var goodID =req.query.goodID;
        console.log("Выбраный товар:", goodID);
        var userID = req.query.userID;
        console.log("Пользователь:", userID);
        if(userID!=undefined) {
            //var cart = {userID: userID, goodID: goodID, size: size, count:'1'};

            var cart = new Cart({userID: userID,goodID: goodID,size: size, count: '1'});
            console.log("корзина: ", cart);


           /* Cart.addCart(userID, goodID, size, '1', function(err, cart) {
                if (err) {
                    console.log("ошибка добавления корзины");
                    //res.status(401);
                    //res.end();
                }
                else {
                    console.log("успешная add");
                    //res.end();
                }
            });*/

            /*user.save(function(err) {
                if (err) console.log("ошибка ");
                else console.log("успешно добавлено");
            });*/

            /*Cart.findOne({userID: '585bca9869b0f01478ae5fde'}, function (err, cart) {
             if (err) {
             console.log("ошибка поиска  корзины: ");
             next(err);
             }
             else {
             console.log("Считалась корзина:");
             console.log(cart);
             }
             });*/

            /*Good.findOne({_id: goodID}, function (err, good) {
             if (err) {
             console.log("ошибка поиска  товара: ", goodID);
             next(err);
             }
             else {
             console.log("Считался товар:");
             console.log(good);
             }
             });*/

            /*User.findOne({_id: userId}, function (err, user) {
                if (err) {
                    console.log("ошибка поиска  пользователя: ", userId);
                    next(err);
                }
                else {
                    console.log("Считался user:");
                    console.log(user);
                }
            });*/

            if(size!=undefined) {

                res.status(200);
            }
            else {
                res.status(401);
            }
        }
        else {
            res.status(402);
        }
        res.end();
    }
};