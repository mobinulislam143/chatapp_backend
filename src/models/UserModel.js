const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    fullname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    gender: {type: String, required: true, enum: ["male", "female"]},
    profilePic: {type: String, default: ""},
    
 
}, {timeStamps: true, versionKey: false})

const UserModel = mongoose.model('users', DataSchema)
module.exports = UserModel
