const express=require('express');
const usermiddleware = require('../middleware/usermiddleware');
const submitRout=express.Router();
const{submitcode,runcode}=require('../controllers/submitcode')



submitRout.post('submit/:id',usermiddleware,submitcode);
submitRout.post("/run/:id",usermiddleware,runcode);

module.exports=submitRout;