const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const data={
    name:"neelamohan",
    age:18
}
app.get("/",(req,res)=>{
    res.json((data));

})

const routeStu=require("./routes/students");
app.use("/students",routeStu);

const PORT=process.env.PORT || 5000
app.listen(5000,()=>{
    console.log("Server is running")
})