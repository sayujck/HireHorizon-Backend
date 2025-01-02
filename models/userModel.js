const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        required:true,
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, //url resume file
        resumeName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePic:{
            type:String,
            default:""
        }
    }
},{timestamps:true})

const users = mongoose.model('users', userSchema);
module.exports = users