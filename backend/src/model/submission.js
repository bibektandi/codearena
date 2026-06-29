const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const submissionschema=new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true,

    },
    problemid:{
        type:Schema.Types.ObjectId,
        ref:'problem',
        required:true,

    },
    code:{
         type: String,
         required: true,

    },
    language:{
        type: String,
        required: true,
        enum: ['javascript', 'c++', 'java'],
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'wrong', 'error'],
        default: 'pending'

    },
    runtime:{
        type: Number,  // milliseconds
        default: 0

    },
    memory:{
        type: Number,  // kB
        default: 0

    },
    errormessage:{
          type: String,
          default: ''

    },
    testcasespassed:{
         type: Number,
         default: 0
    },
    testcasestotal:{
          type: Number,
          default: 0

    }

},{
    timestamps:true
});
//compound indexing 
  submissionschema.index({userid:1,problemid:1});

const Submission=mongoose.model('submission',submissionschema);
module.exports=Submission;