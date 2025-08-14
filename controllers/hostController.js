// LOCAL MODULES
const {Home}=require('../models/home')

exports.getAddHome=(req,res,next)=>{
    res.render('host/editHome',{pageTitle:'register here',currentPage:'addHome',editing:false}) ;
};

exports.getEditHome=(req,res,next)=>{
    const homeId=req.params.homeId;
    const editing=req.query.editing==='true';
    Home.findById(homeId).then(([homes])=>{
        const home=homes[0];
        if(!home){
            res.redirect('/host/hostHomeList')
        }
        else{
            res.render('host/editHome',{home:home,pageTitle:'edit home here',currentPage:'hostHomes',editing:editing}) ;
        }
       
    })
    
};

exports.getHostHomes=(req,res,next)=>{
    Home.fetchAll().then(([registeredHomes])=>{
        res.render('host/hostHomeList',{registeredHomes:registeredHomes,pageTitle:'host homes list',currentPage:'hostHomes'});
    });
    
};
exports.postAddHome=(req,res,next)=>{
    const {houseName,location,price,rating,photoUrl,description}=req.body;
    const home=new Home(houseName,location,price,rating,photoUrl,description);

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
    const home=new Home(houseName,location,price,rating,photoUrl,description,id);
    

    home.update()
    .then(()=>{
        res.redirect('/host/hostHomeList');
    })
    .catch((err)=>{
        console.log("cant add home",err)
    });
    
};

exports.postDeleteHome=(req,res,next)=>{
    const homeId=req.params.homeId;
    Home.delete(homeId).then(()=>{
          res.redirect('/host/hostHomeList');
    })
    .catch((err)=>{
        console.log("cant add home",err)
    });
  
}