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
authRouters.get('/check',usermiddleware,(req,res)=>{

    const resply={
        firstName:req.user.firstName,
        emailId:req.user.emailId,
        _id:req.user._id
    }

     res.staus(200).json({
        user:reply,
        message:"valid user"
     });
})

module.exports=authRouters;