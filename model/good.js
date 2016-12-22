/**
 * Created by Валентина on 06.11.2016.
 */
var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schemaGood = new Schema({
    goodname: {
        type: String,
        unique: true,
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
    created: {
        type: Date,
        default: Date.now
    },
    size: {
        type: [Number],
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    section: {
        type: String,
        required: true
    },
    img: {
        type:  String,
        required: true
    },
    description: {
        type:  String,
        required: true
    }
});

exports.Good = mongoose.model('Good', schemaGood);

