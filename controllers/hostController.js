// LOCAL MODULES
const {Home}=require('../models/home')

exports.getAddHome=(req,res,next)=>{
    res.render('host/editHome',{pageTitle:'register here',currentPage:'addHome',editing:false}) ;
};

exports.getEditHome=(req,res,next)=>{
    const homeId=req.params.homeId;
    const editing=req.query.editing==='true';
    Home.findById(homeId,(home)=>{
        if(!home){
            res.redirect('/host/hostHomeList')
        }
        else{
            res.render('host/editHome',{home:home,pageTitle:'edit home here',currentPage:'hostHomes',editing:editing}) ;
        } 
    })
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
    res.redirect('/host/hostHomeList');
};
exports.postEditHome=(req,res,next)=>{
    const {houseName,location,price,rating,photoUrl,id}=req.body;
    const home=new Home(houseName,location,price,rating,photoUrl);
    home.id=id;
    console.log(req.body,home,id)
    home.save();
    res.redirect('/host/hostHomeList');
};

exports.postDeleteHome=(req,res,next)=>{
    const homeId=req.params.homeId;
    Home.delete(homeId);
    res.redirect('/host/hostHomeList');
}