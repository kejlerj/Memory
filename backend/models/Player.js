
const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    pseudo: { 
        type: String, 
        required: true 
    },
    score: { 
        type: Number, 
        required: false,
        default: 0
    }
});

module.exports = mongoose.model('Player', playerSchema);
