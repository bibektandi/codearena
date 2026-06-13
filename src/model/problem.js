const mongoose=require('mongoose')
const {Schema}=mongoose;

const problemSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
    type:String,
    required:true
    },
    difficulty:{
     type:String,
     required:true
    },
    tags:{
    type:String,
    required:true,
    },
    Visibletestcases:[
        {
            input:{
              type:String,
              required:true,
            },
            output:{
               type:String,
               required:true
            },
            explanation:{
                type:String,
                required:true
            }

        }
    ],
    hiddentestcases:[
        {
            input:{
              type:String,
              required:true,
            },
            output:{
               type:String,
               required:true
            }

        }
    ],
    startcode:[{
        language:{
            type:String,
            required:true
        },
        initialcode:{
            type:String,
            required:true
        }

    }],
    reference_solution:[
        {
            language:{
                type:String,
                required:true
            },
            complete_code:{
                type:String,
                required:true

            }
        }
    ],
    problemcreator:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

})

const problem=mongoose.model('problem',problemSchema);
module.exports=problem;