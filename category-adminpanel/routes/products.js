const express = require("express");

const route = express.Router();

const {
  addProductPage,insertProduct,
  viewProductPage
} = require("../controllers/productscontroller");

const upload = require("../middleware/products");

// Add Product Page
route.get("/addproductpage", addProductPage);
// Insert Product
route.post("/insertProduct", upload.single("product_image"), insertProduct);

route.get('/viewproductpage',viewProductPage)

// // View Products
// route.get("/viewProductsPage", viewProductPage);
module.exports = route;
