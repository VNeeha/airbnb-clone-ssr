// LOCAL MODULES
const {Home}=require('../models/home')

exports.getAddHome=(req,res,next)=>{
    res.render('host/addHome',{pageTitle:'register here',currentPage:'addHome'}) ;
};

exports.getHostHomes=(req,res,next)=>{
    Home.fetchAll((registeredHomes)=>{
        res.render('host/hostHomeList',{registeredHomes:registeredHomes,pageTitle:'host homes list',currentPage:'hostHomes'});
    });
    
};
exports.postAddHome=(req,res,next)=>{
    const {houseName,location,price,rating,photoUrl}=req.body;
    const home=new Home(houseName,location,price,rating,photoUrl);
    home.save();
    res.render('host/addHomeSuccess',{pageTitle:'success registration',currentPage:'addedHomeSuccess'});
};

