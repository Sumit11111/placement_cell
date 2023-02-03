const express=require('express');
const app=express();
const PORT=8000;

const db=require('./config/mongoose');
const student=require("./models/students");
const user=require("./models/users");
const interview=require('./models/interviews');

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded({extended:false}));

app.use(function(req,res,next){
    //console.log(req);
    next();
});

app.use('/',require('./routes'));

app.listen(PORT,err=>{
    if(err){
        console.log(`Error in running server ${err}`);
    }
    else{
        console.log("server is running at ",PORT);
    }
})
