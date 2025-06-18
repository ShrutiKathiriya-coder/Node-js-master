const express = require("express");

const route = express.Router();

const {addSubcategoryPage,insertsubcategory,viewSubcategoryPage,updateSubCategoryPage,updateSubCategory,deleteSubCategory}=require("../controllers/subcategorycontroller")

// Add SubCategory Page
route.get("/addsubcategorypage", addSubcategoryPage);

// Insert SubCategory
route.post("/insertsubcategory", insertsubcategory);

route.get('/viewsubcategorypage',viewSubcategoryPage);

route.get("/updateSubCategoryPage/:id", updateSubCategoryPage);
route.post("/updateSubCategory/:id", updateSubCategory);
route.get('/deleteSubCategory/:id',deleteSubCategory)

module.exports = route;