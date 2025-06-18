const express = require('express');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const session = require('express-session');
const flash=require('connect-flash');
const localStrategy = require("./middleware/localStrategy");
const app=express();
const port=2000;


app.set('view engine','ejs');


app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(cookieParser());

app.use(session({
    secret: 'shr@05',
    resave: true,
    saveUninitialized: false,
    cookie:
    {maxAge:6000000}
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.currentAdmin);

//routes
app.use('/',require('./routes/adminroute'))
app.use('/category', require('./routes/category'));
app.use('/subcategory',require('./routes/subcategory'));
app.use('/extracategory',require('./routes/extracategory'));
app.use('/products',require('./routes/products'));

app.listen(port,()=>{
    console.log("server started..😎"); 
});