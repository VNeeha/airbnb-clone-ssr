// handled data using fake database
    /*    const registeredHomes=[];
        exports.Home=class Home{
            constructor(houseName,location,price,rating,photoUrl){
                this.houseName=houseName;
                this.location=location;
                this.price=price;
                this.rating=rating;
                this.photoUrl=photoUrl;
            }
            save(){
                registeredHomes.push(this);
            }
            static fetchAll(){
                return registeredHomes;
            }
        }*/

// handling data using file reading and writing so data will remain even after server restarting

// CORE MODULES
const fs=require('fs');
const path=require('path');
// LOCAL MODULES
const rootDir=require('../utils/pathUtils');
const Favourite=require('./favourites')

const dataFilePath=path.join(rootDir,'data','registeredHomes.json');

exports.Home=class Home{
            constructor(houseName,location,price,rating,photoUrl){
                this.houseName=houseName;
                this.location=location;
                this.price=price;
                this.rating=rating;
                this.photoUrl=photoUrl;
            }
            save(){
                
                 Home.fetchAll((registeredHomes)=>{ 
                     console.log(this,this.id)
                    if(this.id){

                        registeredHomes=registeredHomes.map((home)=>home.id!==this.id?home:this);
                    }
                    else{
                        this.id=Math.random().toString();
                        registeredHomes.push(this);
                        
                    }                    
                   fs.writeFile(dataFilePath,JSON.stringify(registeredHomes),error=>console.log("file writing",error));
                });
                
            }
            static fetchAll(callBack){
                
                fs.readFile(dataFilePath,(err,data)=>{
                    let homes=[];
                    if(!err&&data.length>0){
                        homes=JSON.parse(data);
                        if(!Array.isArray(homes)){
                            homes=[homes];
                        }
                    }
                    callBack(homes);
                });
            }
            static findById(id,callBack){
                Home.fetchAll((registeredHomes)=>{
                    const homeFound=registeredHomes.find((home)=>home.id===id);
                    callBack(homeFound);
                })
            }

            static delete(homeId,callBack){
                Home.fetchAll((registeredHomes)=>{
                    registeredHomes=registeredHomes.filter((home)=>home.id!==homeId);
                    
                    fs.writeFile(dataFilePath, JSON.stringify(registeredHomes), (err) => {
                    if (err) return callBack(err);

                    // Then, delete from favourites
                    Favourite.delete(homeId, (favErr) => {
                        if (favErr) return callBack(favErr);

                        // Both operations done successfully
                        callBack(null);
                        });
                    });

                })
            }
        }

