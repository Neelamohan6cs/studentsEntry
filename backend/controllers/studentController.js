

const allStudents =async (req,res)=>{

    try{
        res.send("all students working");
    }catch(error){
        res.send("erro from student controller");
    }
}

const createStu=async(req,res)=>{
    try{
        await res.status(201).json({
            message:"student created",
            data:req.body
        })

    }catch(error){

    }
}



module.exports = {allStudents,createStu};