const  express = require('express');
const auth=require('../middlewear/authmiddlewear');
const route=express.Router();

console.log("routing");

const {register,login,profile,adddata,updatedata,deletedata}= require('../controller/admin.contoller')

route.post('/register',register);
route.post('/login',login);
route.get('/profile',auth,profile);
route.post('/adddata',adddata);
route.put('/update/:id',updatedata)
route.delete('/delete',deletedata);
module.exports=route;