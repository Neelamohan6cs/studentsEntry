const mongoose = require("mongoose");

const dbConnet= async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/collegepass");
        console.log("succefully db connected");
    }catch(error){
        console.log(error.message);
    }
}

module.exports=dbConnet;