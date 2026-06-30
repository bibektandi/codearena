const express=require('express')
const app=express()
require('dotenv').config();
const main=require('./config/db')
const cookieParser=require('cookie-parser')
const auth_routers=require('./routes/userAuth')
const client=require('./config/redis');
const problemRout=require('./routes/problemcreat');

const submitRouter = require('./routes/submit')
const cors =require('cors')

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/user',auth_routers);
app.use('/problem',problemRout)
app.use('/submission',submitRouter);



const startserver=async()=>{
    try{
        await Promise.all([main(),client.connect()]);
        console.log('db connected');
        app.listen(process.env.PORT,()=>{
        console.log("app is listening in port:"+ process.env.PORT)
         })

    }
    catch(error){
    console.log('error is :'+error);
    }
}

startserver();



