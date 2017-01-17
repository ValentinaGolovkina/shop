/**
 * Created by Валентина on 18.12.2016.
 */

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
    goodname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type:  String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Cart = mongoose.model('Cart', schemaCart);