const express = require("express");

const route = express.Router();

const {addextracategorypage,insertcategorypage,deleteextraCategory,viewextracategorypage, updateextracategory,editextracategory}=require('../controllers/extracategoryconteoller');

//add extracategory

route.get('/addextracategory',addextracategorypage);

route.post('/insertextracategory',insertcategorypage);

route.get("/viewextracategory", viewextracategorypage);

route.get('/deletextracategory/:id', deleteextraCategory);
route.get('/updateextracategory/:id', updateextracategory);
route.post('/editextracategory/:id', editextracategory);

module.exports=route;