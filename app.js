// CORE MODULES
const path=require('path');

// EXTERNAL MODULES
const express=require('express');

// LOCAL MODULES
const {storeRouter}=require('./routes/storeRouter');
const {hostRouter}=require('./routes/hostRouter');
const rootDir=require('./utils/pathUtils');
const errorController=require('./controllers/errors');
const {mongoConnect}=require('./utils/databaseUtil');

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

mongoConnect(()=>{
    app.listen(PORT,()=>console.log(`server is running at address-http://localhost:${PORT}/store`));
})

