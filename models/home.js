// LOCAL MODULES
const db=require('../utils/databaseUtil');
const Favourite=require('./favourites')



exports.Home=class Home{
            constructor(houseName,location,price,rating,photoUrl,description,id){
                this.houseName=houseName;
                this.location=location;
                this.price=price;
                this.rating=rating;
                this.photoUrl=photoUrl;
                this.description=description;
                this.id=id;

            }
            save(){
              
              return db.execute('INSERT INTO homes(houseName,price,rating,location,photoUrl,description) VALUES(?,?,?,?,?,?)',[this.houseName,this.price,this.rating,this.location,this.photoUrl,this.description])
                
            }
            update() {
                return db.execute(
                  'UPDATE homes SET houseName=?, price=?, rating=?, location=?, photoUrl=?, description=? WHERE id=?',
                  [this.houseName, this.price, this.rating, this.location, this.photoUrl, this.description, this.id]
                );
              }


            static fetchAll(){
              return  db.execute("SELECT * FROM homes");
               
            }
            static findById(homeId,callBack){
              return db.execute("SELECT * FROM homes WHERE id=?",[homeId]);
            }

            static delete(homeId){
               return db.execute("DELETE FROM homes WHERE id=?",[homeId]);
                
            }
        }

