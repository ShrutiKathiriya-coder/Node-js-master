const express = require("express");

const route = express.Router();

const {
  addProductPage,insertProduct,
  viewProductPage,deleteproduct
} = require("../controllers/productscontroller");

const upload = require("../middleware/products");

// Add Product Page
route.get("/addproductpage", addProductPage);
// Insert Product
route.post("/insertProduct", upload.single("product_image"), insertProduct);

route.get('/viewproductpage',viewProductPage)
//delete 

route.get('/deleteproduct/:id',deleteproduct)
module.exports = route;
