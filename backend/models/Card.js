const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    icon: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ['HIDDEN', 'VISIBLE', 'FOUND'],
        default: 'HIDDEN',
    },
    gameID: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Card', cardSchema);
