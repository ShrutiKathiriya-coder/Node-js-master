
const express=require('express');
const app=express();
require('dotenv').config();
const db=require('./config/db')


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/admin',require('./routes/adminroute'))
app.use('/resip',require('./routes/reciperoute'))
app.listen(process.env.PORT,()=>{
    console.log("server is started")
})



