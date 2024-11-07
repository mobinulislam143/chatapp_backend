const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages",
            default: [],
        },
    ],
    
 
}, {timeStamps: true, versionKey: false})

const ConversationModel = mongoose.model('conversations', DataSchema)
module.exports = ConversationModel
