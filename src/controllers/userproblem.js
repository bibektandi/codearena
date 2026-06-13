const problem=require('../model/problem');
const {getLanguageById,SubmitBatch}=require('../utils/problemUtility');
const createProblem=async(req,res)=>{
   
const{title,description,difficulty,tags,visibleTestCases,
    hiddenTestCases,startCode,referenceSolution, problemCreator}=req.body;
   

 try{
     for(const{language,completeCode} of referenceSolution){
  //source_code
  //languageId,
  //std_in,
  //expectedoutput
    const language_id=getLaguageById(language);

    const submission=visibleTestCases.map((input,output)=>({
         source_code:completeCode,
         language_id: languageId,
         stdin: input,
         expected_output: output
    }))
    const submitResult=await SubmitBatch(submission);


     }

 }
 catch(error){
     res.send(error.message);
 }
   

    
}