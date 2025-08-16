// CORE MODULES
const mongoose=require('mongoose');
// LOCAL MODULES
const Home=require('../models/home');
const Favourite=require('../models/favourites');


exports.getIndex=(req,res,next)=>{
       Home.find().then(registeredHomes=>{
        res.render('store/index',{registeredHomes:registeredHomes,pageTitle:'airbnb Home',currentPage:'index',isLoggedIn:req.isLoggedIn});
    })
        
    ;
    
};

exports.getHomes=(req,res,next)=>{
     Home.find().then(registeredHomes=>{
        res.render('store/homeList',{registeredHomes:registeredHomes,pageTitle:'homes list',currentPage:'home',isLoggedIn:req.isLoggedIn});
    });
    
};

exports.getHomeDetails=(req,res,next)=>{
    const homeId=req.params.homeId;
   
    Home.findById(homeId).then(home=>{

        if(!home){
            res.redirect('/store/homes');
        }
        else{
            res.render('store/homeDetail',{home:home,pageTitle:'home details',currentPage:'home',isLoggedIn:req.isLoggedIn});
        } 
    });
};

exports.getBookings=(req,res,next)=>{   
        res.render('store/bookings',{pageTitle:'My bookings',currentPage:'bookings',isLoggedIn:req.isLoggedIn}); 
};


exports.getFavouriteList=(req,res,next)=>{   
    Favourite.find().populate('homeId')
    .then((favourites)=>{
       
       const favouriteHomes=favourites.map(favourite=>favourite.homeId);
        // const favouritesId=favourites.map((favourite)=>favourite.homeId.toString());
        // Home.find()
        // .then((registeredHomes)=>{
           
        //     const favouriteHomes=registeredHomes.filter((home)=>
        //         favouritesId.includes(home._id.toString())
        //     )  
            res.render('store/favouriteList',{favouriteHomes:favouriteHomes,pageTitle:'My favourites',currentPage:'favourites',isLoggedIn:req.isLoggedIn});
        })
        .catch((err)=>{
            console.log("cant retrieve registered homes",err)
        })  
        
    // })
    // .catch(err=>{
    //     console.log("cant retrieve favourite homes")
    // })
        
};

exports.AddToFavourites=(req,res,next)=>{   
    const homeId=req.body.id;
    Favourite.findOne({homeId}).then((home)=>{
        if(home){
            console.log("Favourite already added");
        }else{
             const favourite=new Favourite({homeId});
            favourite.save()
            .then(()=>{console.log("Added to favourites")
            })
            .catch(error=>{
                console.log("Favourite added status",error);
            })
        }
    })
    .finally(()=>{
         res.redirect('/store/favourites'); 
    })
    
};

exports.DeleteFromFavourites=(req,res,next)=>{
    const homeId=req.params.homeId;
    Favourite.findOneAndDelete({homeId})
    .then(()=>{console.log("deleted from favourites")
    })
    .catch(error=>{
         console.log("Favourite deleted status",error);
    })
    res.redirect('/store/favourites'); 
    
}

