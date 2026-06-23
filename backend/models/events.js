const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventCollege: {
        type: String,
        required: true
    },
    available: {
        type: Number,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    eventdate: {
        type: Date,
        required: true
    },
    bookedemail: {
        
    type: [String],
    default: []
}
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);