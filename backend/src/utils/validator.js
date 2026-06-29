const validator=require('validator');
const validate=(data)=>{
const mendatoryfields=["password","emailId","firstName"];

const Isallowed=mendatoryfields.every((k)=>Object.keys(data).includes(k));

   if(!Isallowed){
    throw new Error ("invalid credential")
   }

   if(!validator.isEmail(data.emailId)){
     throw new Error ("invalid emailId");
   }
   
   if(!validator.isStrongPassword(data.password)){
    throw new Error ("weak password");
   }

}
module.exports=validate;