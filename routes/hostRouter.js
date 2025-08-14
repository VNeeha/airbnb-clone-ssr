// EXTERNAL MODULES
const express=require('express');
const hostRouter=express.Router();
//LOCAL MODULES
const hostController=require('../controllers/hostController');

hostRouter.get("/addHome",hostController.getAddHome);
hostRouter.post("/addHome",hostController.postAddHome);
hostRouter.get("/hostHomeList",hostController.getHostHomes);

exports.hostRouter=hostRouter;


