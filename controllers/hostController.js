// CORE MODULES
const mongoose=require('mongoose');
// LOCAL MODULES
const Favourites = require('../models/favourites');
const Home=require('../models/home')

exports.getAddHome=(req,res,next)=>{
    res.render('host/editHome',{pageTitle:'register here',currentPage:'addHome',editing:false}) ;
};

exports.getEditHome=(req,res,next)=>{
    const homeId=req.params.homeId;
    const editing=req.query.editing==='true';
    Home.findById(homeId).then(home=>{

        if(!home){
            res.redirect('/host/hostHomeList')
        }
        else{
            res.render('host/editHome',{home:home,pageTitle:'edit home here',currentPage:'hostHomes',editing:editing}) ;
        }
       
    })
    
};

exports.getHostHomes=(req,res,next)=>{
    Home.find().then(registeredHomes=>{
        res.render('host/hostHomeList',{registeredHomes:registeredHomes,pageTitle:'host homes list',currentPage:'hostHomes'});
    });
    
};
exports.postAddHome=(req,res,next)=>{
    const {houseName,location,price,rating,photoUrl,description}=req.body;
    const home=new Home({houseName,price,location,rating,photoUrl,description});
    home.save()
    .then(()=>{
        res.redirect('/host/hostHomeList');
    })
    .catch((err)=>{
        console.log("cant add home",err)
    });
    
};
exports.postEditHome=(req,res,next)=>{
    const {houseName,location,price,rating,photoUrl,description,id}=req.body;
    Home.findById({_id:id}).then((home)=>{
        if(!home){
            console.log("home not found");
            return Promise(resolve);
        }
        home.houseName=houseName;
        home.price=price;
        home.location=location;
        home.rating=rating;
        home.photoUrl=photoUrl;
        home.description=description;
        return home.save();
    }).then(()=>{
        console.log("Home updated");
    }).catch((err)=>{
        console.log("error while updating home",err);
    }).finally(()=>{
        res.redirect('/host/hostHomeList')
    })

};

exports.postDeleteHome=(req,res,next)=>{
    const homeId=req.params.homeId;
    Home.findOneAndDelete({_id:homeId})
    .then(()=>{    
            console.log("Home deleted")
    })
    .catch((err)=>{
            console.log("cant delete from homes list",err)
    })
    .finally(()=>{
        res.redirect('/host/hostHomeList')
    })

    
  
}