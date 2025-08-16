// CORE MODULES
const path=require('path');

// EXTERNAL MODULES
const express=require('express');
require('dotenv').config();
const {default:mongoose}=require('mongoose');

// LOCAL MODULES
const {storeRouter}=require('./routes/storeRouter');
const {hostRouter}=require('./routes/hostRouter');
const rootDir=require('./utils/pathUtils');
const errorController=require('./controllers/errors');
const MONGO_URL = process.env.MONGO_URL;


// creating app
const app=express();

// setting ejs with express and specifying path to ejs templates
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// parsing request
app.use(express.urlencoded());

// granting access to public folder
app.use(express.static(path.join(rootDir,'public')));

// using routers for seperate interfaces-host,user
app.use("/store",storeRouter);
app.use("/host",hostRouter);

// unknown routing handling
app.use(errorController.pageNotFound);

// starting server after connecting to db
const PORT=3007;
// connecting to mongoDB
// MONGO_URL is defined in .env file and starting server only if connection is successful
// if connection fails, it will log the error message
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("connected to mongoDb")
    app.listen(PORT,()=>console.log(`server is running at address-http://localhost:${PORT}/store`));
})
.catch(err=>{
    console.log("cant connect to mongodb")
})

