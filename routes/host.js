// CORE MODULES
const path=require('path');
// EXTERNAL MODULES
const express=require('express');
const hostRouter=express.Router();
//LOCAL MODULES
const rootDir=require('../utils/pathUtils');
const registeredHomes=[];
hostRouter.get("/add-home",(req,res,next)=>{
    res.render('addHome',{pageTitle:'register here'}) ;
})
hostRouter.post("/add-home",(req,res,next)=>{
    registeredHomes.push({houseName:req.body.houseName});
    // console.log(registeredHomes);
    res.render('addHomeSuccess',{pageTitle:'success registrtion'});
})
exports.hostRouter=hostRouter;
exports.registeredHomes=registeredHomes;
