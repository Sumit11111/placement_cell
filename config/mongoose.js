//imprting mongoose
const mongoose=require('mongoose');
//connectin setup
mongoose.connect('mongodb+srv://sumit:DuROeBFhXvtrDJgU@cluster0.eoh5n.mongodb.net/test?authMechanism=DEFAULT');
const db=mongoose.connection;
//opening db connection
db.on('error',console.error.bind(console,"Error connecting to MongoDB"));
db.once('open',function(){
    console.log('Connected to Database::MongoDB');
});

module.exports=db;
