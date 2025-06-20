const express=require('express');
const route =express.Router();

const uploads=require('../middleware/category');

const {addcategorypage,insertCategory,viewcategorypage,editcategoryPage,updatecategory,deletecategory}= require('../controllers/categorycontroller');

//addcategory 

route.get('/addcategorypage',addcategorypage);
route.post('/insertCategory', uploads.single('c_image'), insertCategory);

// viewcategory
route.get('/viewcategorypage', viewcategorypage);

route.get('/editcategoryPage/:id', editcategoryPage);

route.post('/updatecategory/:id', uploads.single('c_image'), updatecategory);

route.get('/deletecategory/:id', deletecategory);
module.exports = route;