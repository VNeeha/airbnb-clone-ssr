// CORE MODULES
const path=require('path');
// EXTERNAL MODULES
const express=require('express');
// LOCAL MODULES
const userRouter=require('./routes/user');
const hostRouter=require('./routes/host');
const rootDir=require('./utils/pathUtils')


const app=express();

app.use(express.urlencoded());
app.use("/user",userRouter);
app.use("/host",hostRouter);
app.use((req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    //with fileHelper
    res.status(404).sendFile(path.join(rootDir,'views','404.html'));
})

const PORT=3007;
app.listen(PORT,()=>console.log(`server is running at address-http://localhost:${PORT}/user`));