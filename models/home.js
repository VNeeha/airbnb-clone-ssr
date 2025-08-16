// EXTERNAL MODULES
const {ObjectId}=require('mongodb');
// LOCAL MODULES
const {getDb}=require('../utils/databaseUtil');




exports.Home=class Home{
            constructor(houseName,location,price,rating,photoUrl,description,_id){
                this.houseName=houseName;
                this.location=location;
                this.price=price;
                this.rating=rating;
                this.photoUrl=photoUrl;
                this.description=description;
                if(_id)
                this._id=_id;

            }
            save(){
              const db=getDb();
              return db.collection("homes").insertOne(this);
            }

            update() {
              const db=getDb();
              const updateObj={
                houseName:this.houseName,
                location:this.location,
                price:this.price,
                rating:this.rating,
                photoUrl:this.photoUrl,
                description:this.description
              }
              return db.collection("favourites").updateOne({_id:new ObjectId(String(this._id))},{$set:updateObj}).then(()=>{
                return db.collection("homes").updateOne({_id:new ObjectId(String(this._id))},{
                $set:updateObj});
              })              
            }

            static fetchAll(){
              const db=getDb();
              return db.collection('homes').find().toArray();
            }
            
            static findById(homeId){
              const db=getDb();
             return db.collection('homes').find({_id:new ObjectId(String(homeId))}).next();
            }

            static delete(homeId){
              const db=getDb();      
              return db.collection('homes').deleteOne({_id:new ObjectId(String(homeId))});                      
            }
        }

