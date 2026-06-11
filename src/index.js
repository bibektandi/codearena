const express=require('express')
const app=express()
require('dotenv').config();
const main=require('./config/db')
const cookieParser=require('cookie-parser')

app.use(express.json())
app.use(cookieParser())



main()
.then(()=>{
    console.log("database connected successfully")
app.listen(process.env.PORT,()=>{
    console.log("app is listening in port:"+ process.env.PORT)
})
})
.catch((err)=>{
    console.log("error is:"+err)
})


