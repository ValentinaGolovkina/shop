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

schemaCart.statics.addCart = function(userID, goodID, size, count, callback) {
    console.log("add Cart");
    var Cart = this;
    console.log("cart.this");
    async.waterfall([
        function(callback) {
            console.log("1-я ф-я");
            Cart.findOne({userID: userID, goodID:goodID,size:size}, callback);

        },
        function(cart, callback) {
            console.log("2-я ф-я");
            if (cart) {
                //callback(new AuthError("Такой email уже зарегистрирован"));
                console.log("Увеличили количество товара");
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