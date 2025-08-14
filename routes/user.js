// CORE MODULES
const path=require('path');
// EXTERNAL MODULES
const express=require('express');
const userRouter=express.Router();
//LOCAL MODULES
const rootDir=require('../utils/pathUtils');

userRouter.get("/",(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','home.html'));
})

module.exports=userRouter;