const mongoose=require('mongoose');
const interviewSchema=new mongoose.Schema({
    cName:{
        type:String,
        required:true
    },
    when:{
        type:Date,
        required:true
    },
    result:{
        type:String,
        required:true
    },
})

const interview=mongoose.model('Interview',interviewSchema);
module.exports=interview;