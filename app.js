// CORE MODULES
const path=require('path');

// EXTERNAL MODULES
const express=require('express');

// LOCAL MODULES
const userRouter=require('./routes/user');
const {hostRouter}=require('./routes/host');
const rootDir=require('./utils/pathUtils')

// creating app
const app=express();

// setting ejs with express and specifying path to ejs templates
app.set('view engine','ejs');
app.set('views','views');

// parsing request
app.use(express.urlencoded());

// granting access to public folder
app.use(express.static(path.join(rootDir,'public')));

// using routers for seperate interfaces-host,user
app.use("/user",userRouter);
app.use("/host",hostRouter);

// unknown routing handling
app.use((req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'));

    //with fileHelper
    // res.status(404).sendFile(path.join(rootDir,'views','404.html'));

    // with partial and ejs
    res.render('404',{pageTitle:'page not found'});

})

// starting server
const PORT=3007;
app.listen(PORT,()=>console.log(`server is running at address-http://localhost:${PORT}/user`));