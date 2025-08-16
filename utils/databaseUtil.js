// EXTERNAL MODULES
const mongo=require('mongodb');
require('dotenv').config();

const MongoClient = mongo.MongoClient;
const MONGO_URL = process.env.MONGO_URL;
let _db;

// creating a connection between cluster and project using cluster URL and MongoClient in mongodb package which has connect method and once connection(client) is established creating database in cluster
const mongoConnect=(callback)=>{MongoClient.connect(MONGO_URL)
.then(client=>{
    _db=client.db("airbnb_mongo")
    callback();
})
.catch(err=>{
    console.log("Error while connecting to cluster of mongo atlas",err);
    throw err;
});
}


// function to access database
const getDb=()=>{
    if(!_db){
        console.log("Database is not connected");
        throw new error("Database is not connected");
    }
    return _db;
}



exports.mongoConnect=mongoConnect;
exports.getDb=getDb;