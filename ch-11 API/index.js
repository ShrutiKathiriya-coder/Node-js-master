const express =require('express');
const  db=require('./config/db')
const app=express();

const port=2000;

app.use(express.urlencoded({extended:true}));


app.use('/', require("./routes/index"));

app.listen(port,(err)=>{
    if(err){
        console.log("error",err);
        return false;
    };
    console.log("server is started");
    
})