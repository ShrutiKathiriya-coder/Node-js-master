
const usersModel = require("../models/usermodal");

const fetchUser = (req, res) => {
  res.status(200).json({ msg: "get Request is call." });
};

const insertUser = async (req, res) => {
  console.log(req.body);

  try {
    const addUser = await usersModel.create(req.body);

    if (addUser) {
      res
        .status(201)
        .json({ insert: true, msg: "User insert Successfully." });
    } else {
      res.status(400).json({ insert: false, msg: "User  Failed." });
    }
  } catch (e) {
    res.status(400).json({ msg: " Wrong here", err: e });
  }
};

//updateuser

const updateuser=async(req,res)=>{
  try {
    const updatedata=await usersModel.findByIdAndUpdate(
    req.params.id,
      req.body
  );
    if(updatedata){
    res.status(200).json({ update: true, msg: "User updated." });
  }else{
    res.status(200).json({ update: false, msg: "User  failed." });
  }
  } catch (e) {
    res.status(400).json({ msg: " Wrong", err: e });
  }
}
//deleteuser

const deleteuser=async(req,res)=>{
  const datadelete=await usersModel.findByIdAndDelete(req.params.id);
  try {
    if(datadelete){
      res.status(200).json({delete: true,msg: " delete succesfully.."})
    }else{
      res.status(200).json({delete: false,msg: " delete not succesfully."})
    }
  } catch (e) {
    res.status(400).json({ msg: "Wrong here", err: e });
  }
}
module.exports = {
  fetchUser,
  insertUser,
  updateuser,
  deleteuser
};
