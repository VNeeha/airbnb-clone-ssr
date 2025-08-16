// LOCAL MODULES
const {Home}=require('../models/home');
const Favourites=require('../models/favourites');


exports.getIndex=(req,res,next)=>{
       Home.fetchAll().then(registeredHomes=>{
        res.render('store/index',{registeredHomes:registeredHomes,pageTitle:'airbnb Home',currentPage:'index'});
    })
        
    ;
    
};

exports.getHomes=(req,res,next)=>{
     Home.fetchAll().then(registeredHomes=>{
        res.render('store/homeList',{registeredHomes:registeredHomes,pageTitle:'homes list',currentPage:'home'});
    });
    
};

exports.getHomeDetails=(req,res,next)=>{
    const homeId=req.params.homeId;
    Home.findById(homeId).then(home=>{

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
    Favourites.fetchAll().then((favouritesId)=>{
        favouritesId=favouritesId.map(favourite=>favourite.homeId)
           Home.fetchAll().then((registeredHomes)=>{
             
            const favouriteHomes=registeredHomes.filter(home=>favouritesId.includes(home._id.toString()))
           
            res.render('store/favouriteList',{favouriteHomes:favouriteHomes,pageTitle:'My favourites',currentPage:'favourites'});
           })
        })
};

exports.AddToFavourites=(req,res,next)=>{  
    const favourite=new Favourites(req.body._id);
    favourite.save() 
    .then(()=>{console.log("Added to favourites")
    })
    .catch(error=>{
         console.log("Favourite added to file status",error);
    })
    res.redirect('/store/favourites'); 
};

exports.DeleteFromFavourites=(req,res,next)=>{
    const homeId=req.params.homeId;
    Favourites.deleteById(homeId)
    .then(()=>{console.log("Deleted favourites")
    })
    .catch(error=>{
         console.log("Favourite deletion status",error);
    }).finally(()=>{
        res.redirect('/store/favourites');
    });
  
    
}

