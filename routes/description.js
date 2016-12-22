var Good = require('model/good').Good;
//var Cart = require('model/good').Cart;
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
        console.log("Выбраный товар:", req.query.name);
        var userID = req.query.userID;
        console.log("Пользователь:", userID);
        if(userID!=undefined) {
           /*Cart.findOne({userID: userID}, function (err, cart) {
                if (err) {
                    console.log("ошибка поиска корзины для пользователя: ", userID);
                    next(err);
                }
                else {
                    console.log("Считалось descriptionOK:");
                    console.log(cart);
                    //res.render('description', {good: good})
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