const category =require('../models/categorymodel');
const subcategory=require("../models/subcategory");
const extraCategory=require('../models/extracategory');
const products=require('../models/productmodel')
const mongoose = require("mongoose");
const fs = require("fs");

// Add SubCategory Page
const addSubcategoryPage = async (req, res) => {

const currentAdmin = req.user;
  try {
    const allCategory = await category.find({});

    res.render("subcategory/addsubcategorypage", {
      allCategory: allCategory,
      success: req.flash("success"),
      error: req.flash("error"),
      currentAdmin
    });
  } catch (e) {
    console.log(e);
    res.redirect("/subcategory/addsubcategorypage");
  }
};


// Insert SubCategory
const insertsubcategory = async (req, res) => {
  console.log(req.body);

  try {
    const insert = await subcategory.create(req.body);

    if (insert) {
      req.flash("success", "Subcategory is insert");
    } else {
      req.flash("error", "Subcategory insertion fail");
    }

    res.redirect("/subcategory/addsubcategorypage");
  } catch (e) {
    console.log(e);
    req.flash("error", `Exception ${e}`);
    res.redirect("/subcategory/addsubcategorypage");
  }
};

const viewSubcategoryPage = async (req, res) => {
  try {
    const record = await subcategory.find().populate("category_id").exec();

    console.log("Sub Category Records", record);

    if (record) {
      res.render("subcategory/viewsubcategorypage", {
        records: record,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      res.redirect("subcategory/viewsubcategorypage");
      req.flash("error", "subcategory is not found.");
    }
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
}


const updateSubCategoryPage = async (req, res) => {
  try {
    const allCategory = await category.find({});
    const updateSubCategory = await subcategory.findById(req.params.id);

    allCategory && updateSubCategory
      ? res.render("subcategory/editsubcategorypage", {
          allCategory,
          updateSubCategory,
          success: "",
          error: "",
        })
      : res.redirect("subcategory/editsubcategorypage  ");
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

//updateSubCategory

const updateSubCategory = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  try {
    const updateData = await subcategory.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (updateData) {
      req.flash("success", "SubCateory is updated...");
    } else {
      req.flash("error", "SubCateory is not updated...");
    }
    res.redirect("/subcategory/viewsubcategorypage");
  } catch (e) {
    console.log(e);

    res.redirect("back");
  }
};

const deleteSubCategory = async (req, res) => {
  const Id = req.params.id

  console.log("Delete SubCategory Id", Id);

  try {
    const deletExtraCategory = await extraCategory.deleteMany({
      subCategory_id: Id,
    });

    const productDeleteData = await products.deleteMany({
      subcategory_id: req.params.id,
    });

    if (deletExtraCategory) {
      const deleteSubCategory = await subcategory.findByIdAndDelete(Id);
      console.log(deleteSubCategory);

      if (deleteSubCategory) {
        req.flash(
          "success",
          `${deleteSubCategory.subcategory_title} delete sucessfull`
        );
      } else {
        req.flash("error", "SubCategory delete fail...");
      }
    } else {
      req.flash("error", "delete fail..");
    }

    res.redirect("/subcategory/viewsubcategorypage");
  } catch (e) {
    console.log(e);
    res.redirect("/subcategory/viewsubcategorypage");
  }
};

module.exports = {
  addSubcategoryPage,
  insertsubcategory,
  viewSubcategoryPage,
  updateSubCategoryPage,
  updateSubCategory,
  deleteSubCategory
};