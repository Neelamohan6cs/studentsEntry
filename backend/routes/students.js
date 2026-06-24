const express =require("express");
const router =express.Router();
const {allStudents,createStu,getById,getAll,updateById,deleteById}=require("../controllers/studentController");

router.get("/",allStudents);

router.post("/create",createStu);
router.get("/getall",getAll);


router.put("/:id",updateById);

router.delete("/:id",deleteById);


router.get("/:id",getById);



module.exports=router;
