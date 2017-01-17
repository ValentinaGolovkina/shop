/**
 * Created by Валентина on 14.01.2017.
 */
var Cart = require('model/cart').Cart;
var async = require('async');
exports.delete = function (req, res, next) {
    var userID = req.session.user;
    var goodid = req.query.goodID;
    var sizeD = req.query.size;
    async.waterfall([
        function(callback) {
            Cart.findOne({userID: userID, goodID: goodid, size: sizeD}, callback);
        },
        function(cart, callback) {
            if (cart) {
                if (cart.get('count') > 1) {
                    cart.count = cart.get('count') - 1;
                    cart.save(function (err) {
                        if (err)  callback(err);
                        else callback(null);
                    });
                } else {
                    Cart.remove({userID: userID, goodID: goodid, size: sizeD}, function (err) {
                        if (err)  callback(err);
                        else callback(null);
                    });
                }
            }
        }
    ], function (err) {
        if (err) next(err);
        else res.redirect('/cart');
    });
};