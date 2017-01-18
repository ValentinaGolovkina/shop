/**
 * Created by Валентина on 14.01.2017.
 */
var Cart = require('model/cart').Cart;
var Good = require('model/good').Good;
var async = require('async');
exports.add = function (req, res, next) {
    var size = req.query.size;
    var goodID =req.query.goodID;
    var userID = req.session.user;
    if(userID != undefined) {
        if(size!=undefined) {
            async.waterfall([
                function(callback) {
                    Cart.findOne({userID: userID, goodID:goodID,size:size}, callback);
                },
                function(cart, callback) {
                    if (cart) {
                        cart.count=cart.get('count')+1;
                        callback(null,cart);
                    }else {
                        Good.findOne({_id:goodID},  function (err, good){
                            cart = new Cart({userID: userID,goodID: goodID, goodname:good.get('goodname'), category:good.get('category'), price:good.get('price'), img: good.get('img'), size: size, count: '1'});
                            callback(null,cart);
                        });
                    }

                },
                function(cart) {
                    cart.save(function(err) {
                        if (err) { next(500); }
                        else { res.status(200).end(); }
                    });
                }
            ], next);
        }
        else { next(401).end(); }
    }
    else { next(402).end(); }
};