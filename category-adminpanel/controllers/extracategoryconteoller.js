const category=require('../models/categorymodel');
const subcategory=require('../models/subcategory');
const extracategory=require('../models/extracategory');
const products=require('../models/productmodel');

const addextracategorypage = async (req, res) => {
  try {
    const allCategory = await category.find({});
    const allSubCategory = await subcategory.find({});

    if (allCategory && allSubCategory) {
      res.render("extracategory/addextracategory", {
        success: req.flash("success"),
        error: req.flash("error"),
        allCategory,
        allSubCategory,
      });
    } else {
      res.redirect("back");
    }
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

const deleteExtracategory = async (req, res) => {
    const id = req.params.id;
    console.log("Delete extracategory with id:", id);
    try {
        const productDeleteData = await products.deleteMany({
            extraCategory_id: id,
        });

        const deleteextraCategory = await extracategory.findByIdAndDelete(id);

        if (deleteextraCategory && productDeleteData) {
            req.flash("success", `${deleteextraCategory.extraCategory_title} deleted successfully.`);
        } else {
            req.flash("error", "ExtraCategory not found.");
        }
    } catch (error) {
        console.log("Error deleting extracategory:", error);
        req.flash("error", "Something went wrong while deleting.");
    }
    res.redirect("/extracategory/viewextracategory");
};



const insertcategorypage = async (req, res) => {
  console.log(req.body);

  try {
    const insertextracategory = await extracategory.create(req.body);

    if (insertextracategory) {
      req.flash("success", `${req.body.extraCategory_title} is inserted.`);
    } else {
      req.flash("error", `${req.body.extraCategory_title} insertion failed.`);
    }

    res.redirect("/extracategory/addextracategory");
  } catch (e) {
    console.log("Error:", e);
    req.flash("error", "not  found");
    res.redirect("/extracategory/addextracategory");
  }
};


const viewextracategorypage = async (req, res) => {
  try {
    const allExtraCategory = await extracategory.find()
        .populate("category_id")
  .populate("subCategory_id");

    console.log(allExtraCategory);

    allExtraCategory
      ? res.render("extracategory/viewextracategory", {
          success: req.flash("success"),
          error: req.flash("error"),
          allExtraCategory,
        })
      : res.redirect("back");
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

const deleteextraCategory = async (req, res) => {
    const id = req.params.id;
    console.log("Delete extracategory with id:", id);
    try {
        const productDeleteData = await products.deleteMany({
            extraCategory_id: id,
        });

        const deleteextraCategory = await extracategory.findByIdAndDelete(id);

        if (deleteextraCategory && productDeleteData) {
            req.flash("success", `${deleteextraCategory.extraCategory_title} deleted successfully.`);
        } else {
            req.flash("error", "ExtraCategory not found.");
        }
    } catch (error) {
        console.log("error:", error);
        req.flash("error", "error not found");
    }
    res.redirect("/extracategory/viewextracategory");
}


const updateextracategory = async (req, res) => {
    try {
        const id = req.params.id;
        const currentAdmin = req.user;

        const allCategory = await category.find({});
        const allSubCategory = await subcategory.find({});
        const updateextracategory = await extracategory.findById(id);

        if (!updateextracategory) {
            req.flash("error", "ExtraCategory not found");
            return res.redirect("/extracategory/viewextracategory");
        }

        res.render('extracategory/editextracategory', {
            currentAdmin,
            success: req.flash("success"),
            error: req.flash("error"),
            allCategory,
            allSubCategory,
            updateextracategory
        });
    } catch (error) {
        console.error(error);
        req.flash("error", "Server error");
        res.redirect("/extracategory/updateextracategory");
    }
};

// Edit ExtraCategory
const editextracategory = async (req, res) => {
    try {
        const updateData = await extracategory.findByIdAndUpdate(req.params.id, req.body);
        if (updateData) {
            req.flash("success", "ExtraCategory update successfully.");
        } else {
            req.flash("error", "ExtraCategory update fail.");
        }
        res.redirect("/extracategory/viewextracategory");
    } catch (e) {
        console.error(e);
        req.flash("error", "server error");
        res.redirect("/extracategory/viewextracategory");
    }
};

module.exports = {
  addextracategorypage,
  insertcategorypage,
  viewextracategorypage,
 deleteextraCategory,
 updateextracategory,
 editextracategory
};
