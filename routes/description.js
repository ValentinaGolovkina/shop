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
                //console.log(good);
                res.render('description', {good: good});
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
            if(size!=undefined) {
                Cart.addCart(userID, goodID, size, function(err) {
                    if (err) {
                        console.log("ошибка добавления корзины");
                        res.status(403);
                    }
                    else {
                        console.log("успешная add");
                        res.status(200);
                    }
                });
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