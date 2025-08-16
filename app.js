// CORE MODULES
const path=require('path');

// EXTERNAL MODULES
const express=require('express');
const {default:mongoose}=require('mongoose');
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
require('dotenv').config();

// LOCAL MODULES
const {storeRouter}=require('./routes/storeRouter');
const {hostRouter}=require('./routes/hostRouter');
const authRouter=require('./routes/authRouter');
const rootDir=require('./utils/pathUtils');
const errorController=require('./controllers/errors');
const DB_PATH=process.env.MONGO_URL;

// creating session store(obj from imported class) in required db with collection name.
const store=new MongoDBStore({
    uri:DB_PATH,
    collection:'sessions'
});


// creating app
const app=express();

// setting ejs with express and specifying path to ejs templates
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// parsing request
app.use(express.urlencoded());

// granting access to public folder
app.use(express.static(path.join(rootDir,'public')));


// creating session object 
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store:store
}))

// // middleware for accessing cookie
// app.use((req,res,next)=>{
//     req.isLoggedIn=req.get("Cookie")?req.get("Cookie").split("=")[1] ==='true':false;
//     next();
// })
// middleware for accessing session
app.use((req,res,next)=>{
    req.isLoggedIn=req.session.isLoggedIn;
    next();
})


// using routers for seperate interfaces-host,user,authentication
app.use("/auth",authRouter);
app.use("/store",storeRouter);
// middleware for checking login status
app.use((req,res,next)=>{
    if(req.isLoggedIn)
        next();
    else
        res.redirect('/auth/login');
})
app.use("/host",hostRouter);

// unknown routing handling
app.use(errorController.pageNotFound);

// starting server after connecting to db
const PORT=3007;

mongoose.connect(DB_PATH)
.then(()=>{
    console.log("connected to mongoDb")
    app.listen(PORT,()=>console.log(`server is running at address-http://localhost:${PORT}/store`));
})
.catch(err=>{
    console.log("cant connect to mongodb")
})

