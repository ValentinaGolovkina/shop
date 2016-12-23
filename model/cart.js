/**
 * Created by Валентина on 18.12.2016.
 */

var async = require('async');
var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schemaCart = new Schema({
    userID: {
        type: String,
        required: true
    },
    goodID: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

schemaCart.statics.addCart = function(userID, goodID, size, callback) {
    var Cart = this;
    async.waterfall([
        function(callback) {
            Cart.findOne({userID: userID, goodID:goodID,size:size}, callback);
        },
        function(cart, callback) {
            if (cart) {
                cart.count=cart.get('count')+1;
                cart.save(function(err) {
                    if (err) return callback(err);
                    callback(null, cart);
                });
                console.log("Увеличили количество товара:", cart.get('count'));
            }else {
                var cartt = new Cart({userID: userID,goodID: goodID,size: size, count: '1'});
                cartt.save(function(err) {
                    if (err) return callback(err);
                    callback(null, cartt);
                });
            }
        }
    ], callback);
};

exports.Cart = mongoose.model('Cart', schemaCart);