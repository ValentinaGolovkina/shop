/**
 * Created by Валентина on 18.12.2016.
 */
var Good = require('model/good').Good;
var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schemaCart = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    goods: {
        type: [Schema.Types.ObjectId],
        unique: true,
        required: true
    }
});

exports.Cart = mongoose.model('Cart', schemaCart);