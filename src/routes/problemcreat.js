
const express=require('express');
const problemRout=express();
const {}=require('../controllers/userproblem');
const adminmiddleware=require('../middleware/adminmiddleware');


problemRout.post('/create',adminmiddleware,Createproblem);
problemRout.patch('/:id',adminmiddleware,Updateproblem);
problemRout.delete('/:id',adminmiddleware,Deleteproblem);

problemRout.get('/:id',getproblembyID);
problemRout.get('/',getAllproblem);
problemRout.get('/user',solvedAllProblembyUser);