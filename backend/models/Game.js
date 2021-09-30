
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    startTime: { 
        type: Date,
        required: true 
    },
    endTime: { 
        type: Date, 
        required: false,
        default: null
    },
    nbClick: { 
        type: Number, 
        require: false,
        default: 0
    },
    // nbJoueur: { type: Number, required: true },
    fieldSize: {
        type: Number,
        //required: true
    },
    player: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', 
        required: true 
    } // Array of player ?
});

module.exports = mongoose.model('Game', gameSchema);
