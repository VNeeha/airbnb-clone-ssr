// EXTERNAL MODULES
const mongoose=require('mongoose');
// LOCAL MODULES
const Favourite=require('./favourites');


// id automatically added by mongoose
const homeSchema=mongoose.Schema({
  houseName:{type:String,required:true},
  price:{type:String,required:true},
  location:{type:String,required:true},
  rating:{type:String,required:true},
  photoUrl:String,
  description:String
});

homeSchema.pre('findOneAndDelete',async function(next){
  const homeId=this.getQuery()._id;
  await Favourite.deleteMany({homeId});
  next();
})

module.exports=mongoose.model("Home",homeSchema);