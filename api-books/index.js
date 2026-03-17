const express= require ("express")
const app =express();

app.get("/",(req,res)=>{
    res.send("Books API running");

});
app.listen(3001, ()=> console.log("Books API on 3001"));