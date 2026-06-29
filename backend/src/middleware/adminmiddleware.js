const redis=require('../config/redis')
const User=require('../model/user')
const JWT=require('jsonwebtoken')



const adminmiddleware=async(req,res,next)=>{
  try{
    
    const {token}=req.cookies;
    
    if(!token) throw new Error("invalid request");

    const payload=await JWT.verify(token,process.env.JWT_KEY);
    
 
    if(!payload)throw new Error("invalid token");
     const{_id}=payload;
    if(!_id) throw new Error("invalid token");
  
    if(payload.role!='admin'){
        throw new Error ('u r not admin')
    }
    
    
    
    //check for redis bloacklist
    const IsBlocked=await redis.exists(`token:${token}`);
     if(IsBlocked) throw  new Error('invalid token');

     const user=await User.findById({_id});
    if(!user)throw new Error("User doesnot exist");
    
     req.user=user;
     console.log(user);
     next();


  }
  catch(error){
   res.status(401).send(error.message);
  }
}
module.exports=adminmiddleware;