// CORE MODULES
const {ObjectId}=require('mongodb');
// LOCAL MODULES
const {getDb}=require('../utils/databaseUtil')
const {Home}=require('./home');

module.exports=class Favourites{
    constructor(homeId){
        this.homeId=homeId;
    }
    save(){
        const db=getDb();
        return db.collection('favourites').insertOne(this);     
    }
    static fetchAll(){
      const db=getDb();
      return db.collection('favourites').find().toArray();
    }

    static deleteById(homeId){
        const db=getDb();
        return db.collection('favourites').deleteOne({homeId});
    }
}