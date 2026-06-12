const express=require('express');
const authRouters=express.Router();
const {register,login,logout}=require('../controllers/userAuthents')
const usermiddleware=require('../middleware/usermiddleware')

//register
authRouters.post('/register',register);
//login
authRouters.post('/login',login);
//logout
authRouters.post('/logout',usermiddleware,logout);
//getprofile
// authRouters.post('/getprofile',getprofile);

module.exports=authRouters;