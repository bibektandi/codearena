const  validate  = require("../utils/validator");
const JWT= require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../model/user');
const usermiddleware= require('../middleware/usermiddleware');
const redis=require('../config/redis');

const register=async (req,res)=>{
  try{
    validate(req.body);
    const {emailId,password,firstName}=req.body;

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    req.body.password=hash;

    const user=await User.create(req.body);
    const token=JWT.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});//here in second

    res.cookie('token',token,{maxAgae:60*60*1000})//here in ms
    res.status(201).send('user registered_successfully');
    

  }
  catch(err){
     res.status(400).send('new error:'+err);
  }
}
const login=async(req,res)=>{
    try{

    
    const {emailId,password}=req.body;
     if(!emailId){
        throw new Error("invalid credential");
     }
     if(!password){
        throw new Error("invalid credential");
     }
    const user=await User.findOne({emailId});
    const good=await bcrypt.compare(password,user.password);

    if(!good){
        throw new Error("invalid credential");
    }
    const token=JWT.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});
    res.cookie('token',token,{maxAge:60*60*1000});
    res.status(201).send("login successfully");
    }
    catch(err){
      res.send("error is :"+err);
    }
   
}
const logout=async(req,res)=>{
  const {token}=req.cookies;
  const payload = JWT.decode(token);

  await redis.set(`token:${token}`,'Blocked');
  await redis.expireAt(`token:${token}`,payload.exp);

  res.cookie("token",null,{expires:new Date(Date.now())});
  res.send('logout successfully');
}
const adminRegister=async(req,res)=>{
  
}
module.exports={login,register,logout};