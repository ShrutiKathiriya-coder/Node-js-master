const category=require('../models/categorymodel');
const subcategory=require('../models/subcategory');
const extraCategory=require('../models/extracategory');
const products=require('../models/productmodel');

const mongoose= require('mongoose');
const fs=require('fs');

//add category

const addcategorypage=(req,res)=>{
    res.render('category/addcategorypage',{
        success: req.flash("success"),
        error: req.flash("error"),
    })
}

const insertCategory = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    req.body.c_image = req.file.path;
    const insert = await category.create(req.body);

    if (insert) {
      req.flash("success", "Category insert");
    } else {
      req.flash("error", "Category Insertion fail");
    }
    res.redirect("/category/addCategoryPage");
  } catch (e) {
    req.flash("error", `Exception : ${e}`);
    res.redirect("/category/addCategoryPage");
  }
};

//viewcategorypage

const viewcategorypage = async (req, res) => {
  try {
    const record = await category.find({});

    if (record) {
      res.render("category/viewcategorypage", {
        records: record,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      req.flash("error", "No Category Found");
      res.redirect("back");
    }
  } catch (e) {
    console.log(e);

    res.redirect("back");
  }
};

//editcategoryPage
const editcategoryPage = async (req, res) => {
  try {  
    console.log(req.params.id);

    const data = await category.findById(req.params.id);

    console.log("Edit Data", data);

    if (data) {
      res.render("category/editCategoryPage", {
        data: data,
        success: "",
        error: "",
        currentAdmin
      });
    } else {
      res.redirect("category/editCategoryPage");
    }
  } catch (e) {
    console.log(e);

    res.redirect("category/editCategoryPage");
  }
};

// Update Category
const updatecategory = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    console.log(req.file);

    const data = await category.findById(req.params.id);

    if (req.file) {
      console.log(" File is Call");

      fs.unlinkSync(data.c_image);

      req.body.c_image = req.file.path;

      const updateData = await category.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      console.log("Update Data ", updateData);

      if (updateData) {
        req.flash("success", "Category update successfully...");
      } else {
        req.flash("error", "Category  failed.");
      }
    } else {
      console.log("Not File Called..");

      if (data) {
        req.body.c_image = data.c_image;

        const updateData = await category.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        console.log("Update Data ", updateData);

        if (updateData) {
          req.flash("success", "Category update successfully.");
        } else {
          req.flash("error", "Category updation failed");
        }
      } else {
        req.flash("error", "data is not found");
      }
    }

    res.redirect("/category/viewcategoryPage");
  } catch (e) {
    console.log("Exception", e);
    res.redirect("back");
  }
};

// deletecategory
const deletecategory = async (req, res) => {
  try {
    const id = req.params.id;

    const categoryData = await category.findById(id);

    if (!categoryData) {
      req.flash("error", "Category not found.");
      return res.redirect("back");
    }

    if (categoryData.c_image && fs.existsSync(categoryData.c_image)) {
      fs.unlinkSync(categoryData.c_image);
    }

    await category.findByIdAndDelete(id);

    req.flash("success", "Category deleted successfully.");
    return res.redirect("/category/viewcategorypage");

  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while deleting.");
    return res.redirect("/category/viewcategorypage");
  }
};
module.exports={
    addcategorypage,
    insertCategory,
    viewcategorypage,
    editcategoryPage,
    updatecategory,
    deletecategory
}