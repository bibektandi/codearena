
const express=require('express');
const problemRout=express.Router();
const {createProblem,updateproblem,deleteproblem,getproblembyid,getallproblem,solvedAllProblembyUser,submittedProblem}=require('../controllers/userproblem');
const adminmiddleware=require('../middleware/adminmiddleware');
const usermiddleware=require('../middleware/usermiddleware')


problemRout.post('/create',adminmiddleware,createProblem);
problemRout.put('/updata/:id',adminmiddleware,updateproblem);
problemRout.delete('/delete/:id',adminmiddleware,deleteproblem);

problemRout.get('/problembyid/:id',usermiddleware,getproblembyid);
problemRout.get('/getallproblem',usermiddleware,getallproblem);
problemRout.get("/problemSolvedByUser",usermiddleware, solvedAllProblembyUser);
problemRout.get("submittedProblem/:pid",usermiddleware,submittedProblem);

module.exports=problemRout;