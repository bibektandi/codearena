const axios=require('axios');

const getLanguageById=(lang)=>{
    const language={
        "c++":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()];
}
const waiting=async(time)=>{
   setTimeout(()=>{
     return 1;
   },time);
}

const SubmitBatch=async(submissions)=>{
   

const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'false'
  },
  headers: {
   'x-rapidapi-key': process.env.SUBMIT_KEY,
    'x-rapidapi-host': process.env.SUBMIT_HOST,
    'Content-Type': 'application/json'
  },
  data: {
    submissions
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data
	} catch (error) {
		res.send('error is:'+error);
	}
}

return await fetchData();
}
const SubmitToken=async(ResultToken)=>{
 

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens:ResultToken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': process.env.SUBMIT_KEY,
    'x-rapidapi-host':process.env.SUBMIT_HOST
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		res.send('error is:'+error);
	}
}
while(true){

const result=await fetchData();

const IsResultObtained=result.submissions.every((r)=>r.status_id>2);

if(IsResultObtained)return result.submissions;

await waiting(1000);
}



}

module.exports={getLanguageById,SubmitBatch,SubmitToken};
//