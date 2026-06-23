const express =require("express");
const router =express.Router();
const {allStudents,createStu}=require("../controllers/studentController");

router.get("/",allStudents);

router.post("/create",createStu);



module.exports=router;
