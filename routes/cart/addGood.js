/**
 * Created by Валентина on 14.01.2017.
 */
var Cart = require('model/cart').Cart;
var async = require('async');
exports.add = function (req, res, next) {
    var size = req.query.size;
    var goodID =req.query.goodID;
    var userID = req.session.user;
    var goodname = req.query.goodname;
    var category =req.query.category;
    var price = req.query.price;
    var img = req.query.img;
    if(userID != undefined) {
        if(size!=undefined) {
            async.waterfall([
                function(callback) {
                    Cart.findOne({userID: userID, goodID:goodID,size:size}, callback);
                },
                function(cart, next) {
                    if (cart) {
                        cart.count=cart.get('count')+1;
                    }else {
                        cart = new Cart({userID: userID,goodID: goodID, goodname:goodname, category:category, price:price, img: img, size: size, count: '1'});
                    }
                    cart.save(function(err) {
                        if (err) { next(500); }
                        else { res.status(200); }
                    });
                }
            ], next);
        }
        else { next(401); }
    }
    else { next(402); }
    res.end();
};