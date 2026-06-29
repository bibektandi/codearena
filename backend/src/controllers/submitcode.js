const Problem = require("../models/problem");
const Submission = require("../models/submission");
const User = require("../models/user");
const {getLanguageById,SubmitBatch,SubmitToken} = require("../utils/problemUtility");

const submitcode=(req,res)=>{
    try{
        const userid=req.user._id;
        const problemid=req.params.id;

        const {code,language}=req.body;
        if(!userid||!code||!problemid||!language){
            return res.status(400).send("some field are missing in submit code");
        }
        //fethc the problem from data base;
        const problem_is =await Problem.findById(problemid);
        //inu ame hidden testcases paijima;

        //before sending to judhe0 we must store whatever user is giving
        const submittedresult=await Submission.create({
            userid,
            problemid,
            code,
            language,
            status:"pending",
            testcasestotal:problem_is.hiddentestcases.length
        })

        //judge0 ko submit kroo vaai

          //source_code
          //languageId,
          //std_in,
          //expectedoutput
            const language_id=getLanguageById(language);
            if(!language_id)throw new Error("no lang_id");
        
            const submission=hiddentestcases.map((testcases)=>({
                 source_code:code,
                 language_id: language_id,
                 stdin: testcases.input,
                 expected_output: testcases.output
            }))
     
        
           const SubmitResult=await SubmitBatch(submission);
           const ResultToken= SubmitResult.map((value)=>value.token);
           const TestResult=await SubmitToken(ResultToken);
         //
         //submitted  result ko abb update karo kyunki result aachuka hai
           let testcasespassed = 0;
            let runtime = 0;
           let memory = 0;
          let status = 'accepted';
          let errormessage = null;
            for(const test of TestResult){
                if(test.status_id==3){
                    testcasespassed++;
                    runtime=runtime+parseFloat(test.time);
                    memory=Math.max(memory,test.memory);
                 
                }
                else if(test.status._id==4){
                    status='error'
                    errormessage=test.stderr
                }
                else{
                    status='wrong'
                    errormessage=test.stderr
                }
            }
             
        submittedresult.status=status;
        submittedresult.testcasespassed=testcasespassed;
        submittedresult.errormessage=errormessage;
        submittedresult.runtime=runtime;
        submittedresult.memory=memory;

        await submittedresult.save();
        
        //agar problemId user ke schema mein na ho toh wahan daaldo;
        if(!req.user.problemSolve.includes(problemid)){
            req.user.problemSolve.push(problemid);
           await req.user.save();
        }
         
        
            res.status(201).send(submittedresult);
             
        

    }
    catch(error){
         res.status(500).send("Internal Server Error "+ err);

    }
}

const runcode=(req,res)=>{
     try{
        const userid=req.user._id;
        const problemid=req.params.id;

        const {code,language}=req.body;
        if(!userid||!code||!problemid||!language){
            return res.status(400).send("some field are missing in submit code");
        }
        //fethc the problem from data base;
        const problem_is =await problem.findById(problemid);
        //inu ame visibletestcases testcases paijima;
        //judge0 ko vejdo  vaai

          //source_code
          //languageId,
          //std_in,
          //expectedoutput
            const language_id=getLanguageById(language);
            if(!language_id)throw new Error("no lang_id");
        
            const submission=Visibletestcases.map((testcases)=>({
                 source_code:code,
                 language_id: language_id,
                 stdin: testcases.input,
                 expected_output: testcases.output
            }))
     
        
           const SubmitResult=await SubmitBatch(submission);
           const ResultToken= SubmitResult.map((value)=>value.token);
           const TestResult=await SubmitToken(ResultToken);
         //
 
         
        
            res.status(201).send(TestResult);
             
        

}
catch(error){
    res.status(500).send("Internal Server Error "+ err);

}
}
module.exports={submitcode,runcode};