const admin = require('../models/admin')
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

//login page

const loginPage = (req, res) => {
    res.render('login', {
    success: req.flash("success"),
    error: req.flash('error')
  });

}

//user chaekd


const userChecked = async (req, res) => {
  req.flash("success", "Admin Login Successfully...");
    res.redirect('/dashboard');
}

//lost password

const lostPassword = async (req, res) => {
    res.render("lostpassword");
}

//otyverifypage

const otpverifypage = (req, res) => {
    const success = req.flash('success');
    const error = req.flash('error');
    res.render('otpverify');

}

//chech email

const checkEmail = async (req, res) => {
    console.log(req.body.email);

    const email = req.body.email;

    const data = await admin.findOne({ email: email });

    console.log(data);


    if (data) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: "kathiriyashruti3@gmail.com",
                pass: "gvtlflbtzmjtyvfx",
            },
        });
        const OTP = String(Math.floor(100000 + Math.random() * 900000)); // Ensures 6-digit string


        const info = await transporter.sendMail({
            from: 'kathiriyashruti3@gmail.com',
            to: email,
            subject: "Your One-Time Password (OTP) for Password Reset",
            html: `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 30px auto;
        padding: 30px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      }
      .title {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .underline {
        width: 60px;
        height: 3px;
        background-color: #007BFF;
        margin: 0 auto 20px auto;
      }
      p {
        font-size: 14px;
        color: #333;
        line-height: 1.6;
      }
      .otp-box {
        font-size: 18px;
        font-weight: bold;
        background-color: #f1f1f1;
        padding: 10px 15px;
        border-left: 5px solid #007BFF;
        margin: 10px 0 20px 0;
        display: inline-block;
      }
      .footer {
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="title">One-Time Password</div>
      <div class="underline"></div>
      <p>Hello,</p>
      <p>
        For your account security, we have implemented Two-Factor Authentication (2FA). To verify your identity, please use the One-Time Password (OTP) provided below.
      </p>
      <p>Your OTP:</p>
      <div class="otp-box">OTP: ${OTP}</div>
      <p>
        Please enter this OTP within 10 minutes. It is valid for one-time use only and should not be shared with anyone, including our support team.
      </p>
      <p>Thank you for your attention to account security.</p>
      <div class="footer">
        <p>Best regards,<br>Shruti Kathiriya</p>
      </div>
    </div>
  </body>
  </html>
`,

        });
        if (info.messageId) {
            res.cookie('email', email);
            res.cookie('OTP', OTP);

            res.redirect('/otpverify')
        } else {
            res.redirect('/lostPassword');
        }

    } else {
        res.redirect('/lostPassword')
    }
};

// //chack otp
const checkotp = (req, res) => {
    console.log(req.body);
    console.log(req.cookies.OTP);


    if (req.body.otp == req.cookies.OTP) {
        res.redirect('/newsetpassword');
    } else {
        res.redirect('/otpverify');
        console.log("OTP has not matched...");
    }
}

//log out 

const logout = (req, res) => {
    req.session.destroy(err => {
    if (err) {
      console.log(err);
      return false;
    }
    res.redirect("/");
  });
}


//dashboard
const dashboard = (req, res) => {
    const currentAdmin = req.user;
    // console.log(currentAdmin);
    res.render('dashboard', { currentAdmin ,success: req.flash('success'), error: req.flash('error') });
}

const AdminData = (req, res) => {
    res.render("addadmin", {
    success: req.flash('success'),
    error: req.flash('error')
  });

}
const insertadmindata = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
    req.body.image = req.file?.path;
    const insert = await admin.create(req.body);

    if (insert) {
      req.flash('success', "New Admin Inserted...");
    } else {
      req.flash('error', "Insertion Failed...");
    }
    res.redirect("/addadmin");
  } catch (e) {
    req.flash('error', `Something went wrong.`);
    res.send(`<h2> not found : ${error} </h2>`);
  }
}
const deleteAdmin = async (req, res) => {
    const id = req.params.id;

    try {
    const data = await admin.findById(req.params.id);
    if (data) {
      if (data.image && fs.existsSync(data.image)) {
        fs.unlinkSync(data.image);
      }
      await admin.findByIdAndDelete(req.params.id);
      req.flash('success', 'Admin deleted successfully.');
      res.redirect('/viewadmin');
    } 
  } catch (e) {
    req.flash('error', `Error: ${e.message}`);
    res.redirect('/viewadmin');
  }

}
const updateAdmin = async (req, res) => {
    console.log("Controller is running..."); 
    
    const id = req.params.id;
    console.log("Id", id);
    
    try {
        const data = await admin.findById(id);

        if (data) {
            res.render('updateAdmin', { 
                data,
                success: req.flash('success'),  
                error: req.flash('error')       
            });
        } else {
            console.log("Single Record not found...");
            req.flash('error', 'Admin not found');
            res.redirect('/viewAdmin');
        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
};

const viewAdmin = async (req, res) => {
    try {
      const currentAdmin = req.user;
      let records = await admin.find({});
      records = records.filter((data) =>
                data.id != currentAdmin._id
            );
    res.render("viewadmin", {
      records,
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (e) {
    req.flash('error', `Error: ${e.message}`);
    res.redirect('/dashboard');
  }
};

const editAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await admin.findById(id); // get old record

        if (data) {
            if (req.file) {
                // Delete old image if it exists
                if (data.image && fs.existsSync(data.image)) {
                    fs.unlinkSync(data.image);
                    console.log("Old image deleted:", data.image);
                }

                req.body.image = req.file.path; // Save new image path
            } else {
                req.body.image = data.image; // Keep old image if no new uploaded
            }

            // Update record with new data
            await admin.findByIdAndUpdate(id, req.body, { new: true });

            req.flash('success', "Admin Updated Successfully");
            res.redirect("/viewadmin");
        } else {
            req.flash('error', "Admin not found.");
            res.redirect("/viewadmin");
        }
    } catch (e) {
        console.error("Update error:", e.message);
        req.flash('error', `Error: ${e.message}`);
        res.redirect("/viewadmin");
    }
};


//view profile

const viewProfile = (req, res) => {
 const currentAdmin = req.user;
    res.render("viewProfile", { currentAdmin, success: "", error: "" });
}
//changepassword
const changepassword = (req, res) => {
    try {
        const currentAdmin = req.user;
        const success = req.flash('success');
        const error = req.flash('error');
            res.render('changepassword', { currentAdmin , success ,error });
    } catch (error) {
        res.send(`<h4> Not found : ${error} </h4>`);
    }
}

//change my new password

const changemypassword = async (req, res) => {
    console.log(req.body);
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const adminData = req.user;

        if (currentPassword === adminData.password) {
            if (newPassword !== adminData.password) {
                if (newPassword === confirmPassword) {
                    try {
                        const isUpdate = await admin.findByIdAndUpdate(adminData._id, { password: newPassword });
                        if (isUpdate) {
                            console.log("Password updated...");
                            res.redirect("/"); 
                        } else {
                            console.log("Password not updated");
                            res.redirect("/changepassword");
                        }
                    } catch (e) {
                        res.send(`<h2> Not Found : ${e} </h2>`);
                    }
                } else {
                    console.log("new and confirm password are not matching");
                    res.redirect("/changepassword");
                }
            } else {
                console.log("new password is same as old password");
                res.redirect("/changepassword");
            }
        } else {
            console.log("current password is incorrect");
            res.redirect("/changepassword");
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
};


//newswtpassword

const newsetpassword = (req, res) => {
    res.render('newsetpassword')
}

// checkPassword

const checkPassword = async (req, res) => {
    console.log(req.body);

    try {
        if (req.body.newPassword == req.body.confirmPassword) {
            const email = req.cookies.email;

            const data = await admin.findOne({ email: email });

            if (data) {
                const updatePass = await admin.findByIdAndUpdate(data.id, { password: req.body.newPassword });
                if (updatePass) {
                    console.log("your Password is update😁");

                    res.clearCookie('email');
                    res.clearCookie('OTP');
                    res.redirect('/');

                } else {

                    res.redirect('newsetpassword');
                }
            } else {
                res.redirect('newsetpassword');
            }
        } else {
            console.log("your New Password and conform password are not match😒");

            res.redirect('newsetpassword');
        }

    } catch (e) {
        res.send(`Not Found : ${e}`);
    }
}
const editProfile = async (req, res) => {
    const updateId = req.params.id;

    try {
        const data = await admin.findById(updateId);
        const currentAdmin = req.user;

        if (data) {
            res.render('editProfile', { data, currentAdmin ,success: "", error: "" });
        } else {
            console.log("Single Record not found...");

        }
    } catch (e) {

        res.send(`<p> Not Found : ${e} </p>`);
    }
}
module.exports = {
    loginPage,
    userChecked,
    logout,
    lostPassword,
    otpverifypage,
    checkEmail,
    checkotp,
    editProfile,
    dashboard,
    AdminData,
    insertadmindata,
    viewAdmin,
    deleteAdmin,
    updateAdmin,
    editAdmin,
    viewProfile,
    changepassword,
    newsetpassword,
    changemypassword,
    checkPassword
}