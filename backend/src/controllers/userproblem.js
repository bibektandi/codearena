const problem=require('../model/problem');
const {getLanguageById,SubmitBatch,SubmitToken}=require('../utils/problemUtility');
const User=require('../model/user');
const Submission=require('../model/submission');
const createProblem=async(req,res)=>{
   
const{title,description,difficulty,tags,Visibletestcases,
    hiddentestcases,startcode,reference_solution, problemcreator}=req.body;
   

 try{
     for(const{language,complete_code} of reference_solution){
  //source_code
  //languageId,
  //std_in,
  //expectedoutput
    const language_id=getLanguageById(language);
    if(!language_id)throw new Error("no id");

    const submission=Visibletestcases.map((testcases)=>({
         source_code:complete_code,
         language_id: language_id,
         stdin: testcases.input,
         expected_output: testcases.output
    }))
    if (submission.length === 0) {
    throw new Error("No test cases found");
}

   const SubmitResult=await SubmitBatch(submission);
   const ResultToken= SubmitResult.map((value)=>value.token);
   const TestResult=await SubmitToken(ResultToken);

    for(const test of TestResult){
        if(test.status_id!=3){
            return res.status(400).end("error in submitting with judge0");
        }
    }
     

}

    //storing in db if everything went well;
  
    const userProblem = await problem.create({
        ...req.body,
        
        problemcreator:req.user._id
    });

    res.status(201).send("problem Saved Successfully");
     

 }
 catch(error){
     res.status(400).send(error.message);
 }
   

    
}
const updateproblem=async(req,res)=>{
    const{id}=req.params;
    const{title,description,difficulty,tags,Visibletestcases,
    hiddentestcases,startcode,reference_solution, problemcreator}=req.body;
    try{
        if(!id){
            return res.status(400).send('Missing ID at the time of updating,dont know which id to update');
        }
        const dsaproblem=await problem.findById({id});
        if(!dsaproblem){
            return res.status(404).send('problem id is not available in server');
        }
    for(const{language,complete_code} of reference_solution){
  //source_code
  //languageId,
  //std_in,
  //expectedoutput
    const language_id=getLanguageById(language);
    if(!language_id)throw new Error("no id");

    const submission=Visibletestcases.map((testcases)=>({
         source_code:complete_code,
         language_id: language_id,
         stdin: testcases.input,
         expected_output: testcases.output
    }))
    if (submission.length === 0) {
    throw new Error("No test cases found");
}

   const SubmitResult=await SubmitBatch(submission);
   const ResultToken= SubmitResult.map((value)=>value.token);
   const TestResult=await SubmitToken(ResultToken);

    for(const test of TestResult){
        if(test.status_id!=3){
            return res.status(400).end("error in submitting with judge0");
        }
    }
     

}

    //storing in db if everything went well;
  
    const userProblem = await problem.create({
        ...req.body,
        
        problemcreator:req.user._id
    });

    res.status(201).send("problem Saved Successfully");
     
        
    }
    catch(error){
        res.status(500).send('error is :'+error.message);

    }

}
const deleteproblem=async(req,res)=>{
    const{id}=req.params
   try {
    if(!id){
        return res.status(400).send("ID is missing toh delete nahi kar sakte vaai");
    }
    const deletetedproblem=await problem.findByIdAndDelete({id});
    if(!deletetedproblem){
        return res.status(404).send("problem is missing so delete nahi ho saktaa vaai");
    }

    res.status(200).send("successfully_deleted");


    }
    catch(error){
        res.status(500).send("error"+error.message);

    }
}
const getproblembyid=async(req,res)=>{
    const{id}=req.params ;
    try{
      if(!id)return res.status(400).send('id is missing so problem cant get');
      const getproblem=await problem.findById({id});
      if(!getproblem)return res.status(404).send('problem is not found');

      res.status(201).send(getproblem);
    }
    catch(err){
        res.status(500).send("error is "+err.message)
    }
}
const getallproblem=async(req,res)=>{
    try{
        const getproblem=await problem.find({});
        if(getproblem.length==0){
            return res.status(404).send("problems are missing")
        }
        res.status(200).send(getproblem);

    }
    catch(error){
    res.status(404).send("kuch toh gadabadi nikal pehli fursat mein  :"+error.message);
    }
}
const solvedAllProblembyUser =  async(req,res)=>{
   
    try{
       
      const userId = req.user._id;
      if(!userId) return res.status(500).send("id is not there");

      const user =  await User.findById(userId).populate({
        path:"problemSolve",
        select:"_id title difficulty tags"
      });
      
      res.status(200).send(user.problemSolve);

    }
    catch(err){
      res.status(500).send("ina vul hauche bo babu" + err.message);
    }
}
const submittedProblem = async(req,res)=>{

  try{
     
    const userId = req.user._id;
    const problemId = req.params.pid;

  const ans = await Submission.find({userId,problemId});
  console.log(ans);
  
  if(ans.length==0)
    res.status(200).send("No Submission is persent");

  res.status(200).send(ans);

  }
  catch(err){
     res.status(500).send("Internal Server Error");
  }
}

module.exports={createProblem,updateproblem,
    deleteproblem,getproblembyid,getallproblem,solvedAllProblembyUser,submittedProblem};