const express=require('express');
const app=express();
const PORT=8000;

// database connection and schema setup
const db=require('./config/mongoose');
const student=require("./models/students");
const user=require("./models/users");
const interview=require('./models/interviews');

//ejs template setup
app.set('view engine','ejs');
app.set('views','./views');

//url parser setup
app.use(express.urlencoded({extended:false}));

//route setup
app.use('/',require('./routes'));

//server listening setup
app.listen(PORT,err=>{
    if(err){
        console.log(`Error in running server ${err}`);
    }
    else{
        console.log("server is running at ",PORT);
    }
})
