const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timeStamps: true, versionKey: false });

const MessageModel = mongoose.model('messages', DataSchema); // Make sure the model name matches the reference
module.exports = MessageModel;
