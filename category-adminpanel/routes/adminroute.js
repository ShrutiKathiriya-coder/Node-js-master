const express = require('express');
const multer = require('multer');
const path = require('path');
const passport = require("passport");

const route = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});


const upload = multer({ storage: storage }); //mildelwere



console.log("routing");

const { loginPage, userChecked, lostPassword, otpverifypage, checkEmail, checkotp, editProfile,logout, dashboard, newsetpassword, AdminData, insertadmindata, deleteAdmin, viewAdmin, updateAdmin, editAdmin, viewProfile, changepassword, changemypassword ,checkPassword} = require('../controllers/admincontroller');


//login page
 route.get('/', passport.checkLostPasswordAuthentication, loginPage);

route.post('/login',passport.authenticate("local-auth", { failureRedirect: "/" }), userChecked);
//lost password
route.get('/lostPasswordPage',passport.checkLostPasswordAuthentication, lostPassword);
route.get('/otpverify',passport.checkLostPasswordAuthentication, otpverifypage);
//emailcheck
route.post('/checkEmail', checkEmail);

//otp check
route.post('/checkOTP', checkotp);

//log out 

route.get('/logout', logout);

//password logic
route.get('/lostpassword',passport.checkLostPasswordAuthentication, lostPassword);

//checkNewPassword

route.post('/checkPassword',checkPassword)

//dashboard
route.get('/dashboard',passport.checkAuthentication,  dashboard)
route.get('/addAdmin',passport.checkAuthentication,  AdminData)
route.post('/insertadmin',passport.checkAuthentication,  upload.single('image'), insertadmindata);
route.get('/deleteAdmin/:id',passport.checkAuthentication,  deleteAdmin);
route.get('/updateAdmin/:id',passport.checkAuthentication,  upload.single('image'), updateAdmin);
route.get('/viewAdmin',passport.checkAuthentication,  viewAdmin);
route.post('/editAdmin/:id',passport.checkAuthentication,  upload.single('image'), editAdmin);
route.get('/editProfile/:id', editProfile);
route.post('/editProfile/:id', upload.single('image'), editAdmin);
//view profile
route.get('/viewProfile', passport.checkAuthentication,viewProfile);

//change password
route.get('/changepassword', passport.checkAuthentication,changepassword)

//newpassword

route.get('/newsetpassword', passport.checkLostPasswordAuthentication,newsetpassword)

//changemypassword
route.post('/changemypassword', changemypassword)
module.exports = route,passport;