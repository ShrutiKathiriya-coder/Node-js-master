const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');


// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userdata = await User.findOne({ email });
    if (userdata) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
      role: role
    });
    if (newUser) {
      res.status(201).json({
        message: 'User registered successfully',
      });
    } else {
      res.status(201).json({
        message: 'User registered failed',
      })
    }

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'something went wrong' });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({user:user}, process.env.JWT_SECRAT);
    res.status(200).json({
      message: 'Login successful',
      token:token
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Something went wrong' });
  }
};





exports.profile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'someething went wrong' });
  }
};


exports.adddata = async (req, res) => {
  try {
    const insertdata = await User.create(req.body); 
    res.status(201).json({ message: 'Data added successfully', data: insertdata });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error adding data', error: error.message });
  }
};


exports.updatedata = async (req, res) => {
  try {
    const update = await User.findByIdAndUpdate(req.params.id, req.body);

    if (update) {
      res.status(200).json({ msg: "Update successful", data: update });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Failed to update data", error: error.message });
  }
};


exports.deletedata = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (deletedUser) {
      res.status(200).json({ msg: "User deleted successfully", data: deletedUser });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user", error: error.message });
  }
};
