//imprting mongoose
const mongoose=require('mongoose');
//connectin setup
mongoose.connect(`mongodb+srv://user2:GdIxQjH9CrJF1ruK@cluster0.eoh5n.mongodb.net/placement_cell?authMechanism=DEFAULT`);
const db=mongoose.connection;
//opening db connection
db.on('error',console.error.bind(console,"Error connecting to MongoDB"));
db.once('open',function(){
    console.log('Connected to Database::MongoDB');
});

module.exports=db;
