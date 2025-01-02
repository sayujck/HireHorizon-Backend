const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String
    }],
    salary:{
        type:Number,
        required:true
    },
    experienceLevel:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    vaccancy:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Applications',
    }]
},{timestamps:true})

const Job = mongoose.model('Job', jobSchema);
module.exports = Job