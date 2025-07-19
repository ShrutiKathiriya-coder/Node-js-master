
const express = require('express');

const route = express.Router();
const {createRecipe,updateRecipe,deleteRecipe}=require('../controller/recip.contoller')

route.post('/recipes',createRecipe)
 route.put('/updateRecipe/:id',updateRecipe)
  route.delete('deleteRecipe/:id',deleteRecipe);

module.exports = route;
