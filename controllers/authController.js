exports.getLogin=(req,res,next)=>{
    res.render('auth/login',{pageTitle:'login page',currentPage:'login',isLoggedIn:false})
}
exports.postLogin=(req,res,next)=>{
    // res.cookie("isLoggedIn",true);
    req.session.isLoggedIn=true;
    res.redirect('/store');
}
exports.postLogOut=(req,res,next)=>{
    // res.cookie("isLoggedIn",false);
        req.session.destroy(()=>{   
        res.redirect('/auth/login');
    });
    
}