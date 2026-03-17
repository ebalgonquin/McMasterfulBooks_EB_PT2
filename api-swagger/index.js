const express= require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Swagger API is running");
});
app.listen(3004, ()=> {
    console.log("Swagger API is running 3004");
});