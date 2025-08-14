// EXTERNAL MODULES
const express=require('express');
const storeRouter=express.Router();
//LOCAL MODULES
const storeController=require('../controllers/storeController');

storeRouter.get("/",storeController.getIndex);
storeRouter.get("/homes",storeController.getHomes);
storeRouter.get("/bookings",storeController.getBookings);
storeRouter.get("/favourites",storeController.getFavouriteList);

exports.storeRouter=storeRouter;