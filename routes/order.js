var Order = require('model/order').Order;
var Cart = require('model/cart').Cart;

exports.get = function(req, res,next) {
    var userID = req.query.userID;
    console.log("пользователь для заказа: ", userID);
    Cart.find({userID:userID},function (err, carts){
        if (err) {
            console.log("ошибка поиска заказа для пользователя: ");
            next(err);
        }
        else {
            console.log("Считался заказ");
            //console.log(carts);
            var count = carts.length;
            console.log("кол-во товаров в заказе ", count);

            var order = new Order({cart:carts});
            console.log("Заказ ", order);
            order.save(function(err) {
                if (err) next(err);
            });

            Cart.remove({userID:userID},function (err) {
                if (err) {
                    console.log("ошибка удаления  корзины: ");
                    next(err);
                }
                else {
                    console.log("успешное удаление  корзины: ");
                    res.status(200);
                    res.end();
                }
            });


        }
    });
};