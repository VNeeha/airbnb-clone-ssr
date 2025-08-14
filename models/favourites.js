// CORE MODULES
const fs=require('fs');
const path=require('path');
// LOCAL MODULES
const rootDir=require('../utils/pathUtils');

const favouriteHomesPath=path.join(rootDir,'data','favouriteHomes.json');
module.exports=class Favourites{

    static addToFavourites(homeId,callBack){
        Favourites.getFavouirites((favouriteHomes)=>{
            if(favouriteHomes.includes(homeId)){
                callBack("Home is already added to favourites")
            }else{
                favouriteHomes.push(homeId);
                fs.writeFile(favouriteHomesPath,JSON.stringify(favouriteHomes),callBack);
            }
        })
    }
    static getFavouirites(callBack){
      fs.readFile(favouriteHomesPath,(err,data)=>{
       let favourites=[]
        if(!err&&data.length>0){
            favourites=JSON.parse(data);
            if(!Array.isArray(favourites))
                favourites=[favourites]
        }
        callBack(favourites);
      })
    }
    static delete(homeId,callBack){
        Favourites.getFavouirites((favouriteHomes)=>{
            favouriteHomes=favouriteHomes.filter((favourite)=>favourite!=homeId);
            fs.writeFile(favouriteHomesPath,JSON.stringify(favouriteHomes),callBack);
    });
    }
}