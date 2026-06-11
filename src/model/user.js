const mongoose=require('mongoose');
const {Schema}=mongoose;

const Userschema= new Schema({
    firstName:{
        type:String,
        required:true,
        maxlength:20,
        minlength:3
    },
    LastName:{
        type:String,
        maxlength:20,
        minlength:3,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase:true,
        immutable: true,
    },
    age:{
       type:Number,
       max:65,
       min:10 
    },
    role:{
       type:String,
       enum:['user','admin'],
       default:'user'
    },
    problemSolve:{
       type:[String]
    }

},{
    timestamps:true
});

const User=mongoose.model("user",Userschema);
module.exports=User;
