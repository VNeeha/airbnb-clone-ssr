// CORE MODULES
const path=require('path');
// EXTERNAL MODULES
const express=require('express');
const userRouter=express.Router();
//LOCAL MODULES
const rootDir=require('../utils/pathUtils');
const {registeredHomes}=require('./host')

userRouter.get("/",(req,res,next)=>{
    res.render('home',{registeredHomes:registeredHomes,pageTitle:'available homes'});
})

module.exports=userRouter;