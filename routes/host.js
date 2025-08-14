// CORE MODULES
const path=require('path');
// EXTERNAL MODULES
const express=require('express');
const hostRouter=express.Router();
//LOCAL MODULES
const rootDir=require('../utils/pathUtils');

hostRouter.get("/add-home",(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','addHome.html') );
})
hostRouter.post("/add-home",(req,res,next)=>{
    console.log(req.body);
    res.sendFile(
          path.join(rootDir,'views','addHomeSuccess.html')
       
        );
})
module.exports=hostRouter;