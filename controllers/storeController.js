// LOCAL MODULES
const {Home}=require('../models/home');
const Favourites=require('../models/favourites');



exports.getIndex=(req,res,next)=>{
    Home.fetchAll().then(([registeredHomes])=>{
        res.render('store/index',{registeredHomes:registeredHomes,pageTitle:'airbnb Home',currentPage:'index'});
    })
        
    ;
    
};
exports.getHomes=(req,res,next)=>{
    Home.fetchAll().then(([registeredHomes])=>{
        res.render('store/homeList',{registeredHomes:registeredHomes,pageTitle:'homes list',currentPage:'home'});
    });
    
};
exports.getHomeDetails=(req,res,next)=>{
    const homeId=req.params.homeId;
   
    Home.findById(homeId).then(([homes])=>{
        const home=homes[0];
        if(!home){
            res.redirect('/store/homes');
        }
        else{
            res.render('store/homeDetail',{home:home,pageTitle:'home details',currentPage:'home'});
        }
        
    });
   
    
};
exports.getBookings=(req,res,next)=>{   
        res.render('store/bookings',{pageTitle:'My bookings',currentPage:'bookings'}); 
};
exports.getFavouriteList=(req,res,next)=>{   
    Favourites.getFavouirites((favouriteHomes)=>{
        Home.fetchAll().then(([registeredHomes])=>{
            const favouriteHomesDetails=favouriteHomes.map((homeId)=>registeredHomes.find((home)=>home.id===homeId)).filter(Boolean);
            res.render('store/favouriteList',{favouriteHomes:favouriteHomesDetails,pageTitle:'My favourites',currentPage:'favourites'});
        })
        
    });
};
exports.AddToFavourites=(req,res,next)=>{   
    Favourites.addToFavourites(req.body.id,(error)=>{
        if(error){
            console.log("Favourite added to file status",error);
        }
        res.redirect('/store/favourites')
    })
    
    
};
exports.DeleteFromFavourites=(req,res,next)=>{
    const homeId=req.params.homeId;
    Favourites.delete(homeId,(err)=>{
        if(err){
            console.log("couldnt delete from favourites");
        }
        res.redirect('/store/favourites');
    })
}

