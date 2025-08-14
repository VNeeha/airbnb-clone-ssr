// LOCAL MODULES
const {Home}=require('../models/home')



exports.getIndex=(req,res,next)=>{
    Home.fetchAll((registeredHomes)=>{
        res.render('store/index',{registeredHomes:registeredHomes,pageTitle:'airbnb Home',currentPage:'index'});
    });
    
};
exports.getHomes=(req,res,next)=>{
    Home.fetchAll((registeredHomes)=>{
        res.render('store/homeList',{registeredHomes:registeredHomes,pageTitle:'homes list',currentPage:'home'});
    });
    
};
exports.getBookings=(req,res,next)=>{   
        res.render('store/bookings',{pageTitle:'My bookings',currentPage:'bookings'}); 
};
exports.getFavouriteList=(req,res,next)=>{   
    Home.fetchAll((registeredHomes)=>{
        res.render('store/favouriteList',{registeredHomes:registeredHomes,pageTitle:'My favourites',currentPage:'favourites'});
    });
};

