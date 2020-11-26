const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let teamSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del team es necesario'],
    },
    goalsFor: {
        type: Number,
        default: 0,
    },
    goalsAgainst: {
        type: Number,
        default: 0,
    },
    points: {
        type: Number,
        default: 0,
    },
    img: {
        type: String,
        required: false,
    },
    state: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('team', teamSchema);