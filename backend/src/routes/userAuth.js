const express=require('express');
const authRouters=express.Router();
const {register,login,logout,adminRegister, deleteprofile}=require('../controllers/userAuthents')
const usermiddleware=require('../middleware/usermiddleware');
const adminmiddleware=require('../middleware/adminmiddleware');


//register
authRouters.post('/register',register);
//login
authRouters.post('/login',login);
//logout
authRouters.post('/logout',usermiddleware,logout);
//getprofile
// authRouters.post('/getprofile',getprofile);
//adminregister
authRouters.post('/admin/register',adminmiddleware,adminRegister);
authRouters.delete('/deleteprofile',usermiddleware,deleteprofile)

module.exports=authRouters;