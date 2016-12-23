var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schemaOrder = new Schema({
    cart: {
        type: [
                {
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
                }
            ],
        required: true
    }
});


exports.Order = mongoose.model('Order', schemaOrder);