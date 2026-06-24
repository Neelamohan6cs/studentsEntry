const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        enum:["CSE","ECE","EEE","AIDS"],
        required:true
    }
},

{ timestamps: true });


module.exports = mongoose.model("Student", studentSchema);