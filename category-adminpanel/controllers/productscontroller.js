const category=require('../models/categorymodel');
const subcategory=require('../models/subcategory')
const extracategory=require('../models/extracategory');
const products = require('../models/productmodel');

const addProductPage = async (req, res) => {
  try {
    const allCategory = await category.find();
    const allSubCategory = await subcategory.find();
    const allExtraCategory = await extracategory.find();

    if (allCategory && allSubCategory && allExtraCategory) {
      res.render("products/addproductpage", {
        success: req.flash("success"),
        error: req.flash("error"),
        allCategory,
        allSubCategory,
        allExtraCategory,
      });
    } else {
      res.redirect("back");
    }
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

const insertProduct = async (req, res) => {
  console.log(req.body);
  try {
    req.body.product_image = req.file.path;
    const productInsert = await products.create(req.body);

    if (productInsert) {
      req.flash("success", "Product is insert...");
    } else {
      req.flash("error", "Product is insertion fail");
    }
    res.redirect("/products/addproductpage");
  } catch (e) {
    console.log(e);
  }
};

const viewProductPage = async (req, res) => {
  try {
    const allProducts = await products
      .find()
      .populate('category_id')
       .populate('subcategory_id')
  .populate('extracategory_id');;

    console.log(allProducts);

    if (allProducts) {
      res.render("products/viewproductpage", {
        allProducts,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      res.redirect("products/viewproductpage");
    }
  } catch (e) {
    console.log(e);
    res.redirect("products/viewproductpage");
  }
};

module.exports={
    addProductPage,
    insertProduct,
    viewProductPage
}