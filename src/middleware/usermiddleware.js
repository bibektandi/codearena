const redis=require('../config/redis')
const User=require('../model/user')
const JWT=require('jsonwebtoken')



const usermiddleware=async(req,res,next)=>{
  try{
    const {token}=req.cookies;
    if(!token) throw new Error("invalid request");

    const payload=JWT.verify(token,process.env.JWT_KEY);
    if(!payload)throw new Error("invalid token");

    const{_id}=payload;
    if(!_id) throw new Error("invalid token");
    const user=User.findById({_id});
    if(!user)throw new Error("User doesnot exist");
    
    //check for redis bloacklist
    const IsBlocked=await redis.exists(`token:${token}`);
     if(IsBlocked) throw  new Error('invalid token');

     req.user=user;
     next();


  }
  catch(error){
   res.send(error);
  }
}
module.exports=usermiddleware;