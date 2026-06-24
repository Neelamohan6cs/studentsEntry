const Students = require("../models/Students");

const allStudents = async (req, res) => {
  try {
    res.send("all students working");
  } catch (error) {
    res.status(500).send("error from student controller");
  }
};




const createStu = async (req, res) => {
  try {
    const { name, age, branch } = req.body;
    if (!name || !age || !branch) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const student = await Students.create({ name, age, branch });
    res.status(201).json({
      message: "student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







const getAll = async (req, res) => {
  try {
    const students = await Students.find();
    res.json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error from get all" });
  }
};






const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Students.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateById = async (req, res) => {
    try{
        const{id}=req.params;
         const{name,age,branch}=req.body;
         const updated = await Students.findByIdAndUpdate(
            id,
            { name, age, branch },
            { new: true }
            );
        res.json({updated});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

const deleteById =async(req,res)=>{
    try{
        const{id}=req.params;
        const deleted=await Students.findByIdAndDelete(id);
        res.json({deleted});
    }catch(error){
        res.json({
            message:error.message
        })
    }
}




module.exports = { allStudents, createStu, getById, getAll ,updateById,deleteById};
