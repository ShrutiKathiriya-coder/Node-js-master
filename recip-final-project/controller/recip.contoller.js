const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Recipe = require('../models/resipmodel');

exports.createRecipe = async (req, res) => {
  try {
    const { title, description } = req.body;

    console.log('Request body:', req.body);

    const recipe = new Recipe({
      title,
      description
    });

    await recipe.save();
    res.status(201).json({ message: 'Recipe created', recipe });
  } catch (err) {
    console.error('Error creating recipe:', err.message, err);
    res.status(400).json({ message: 'Server error', error: err.message });
  }
};



exports.updateRecipe = async (req, res) => {
  try {
    const updated = await Recipe.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    res.status(200).json({ message: 'Recipe updated', recipe: updated });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Server error' });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Server error' });
  }
};
