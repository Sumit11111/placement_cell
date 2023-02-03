const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({
    sName:{
        type:String,
        required:true
    },
    batch:{
        type:Number,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    dsa:{
        type:Number,
        required:true
    },
    webDev:{
        type:Number,
        required:true
    },
    react:{
        type:Number,
        required:true
    },
    cName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'interview'
    },
    result:{
        type:String,
        required:true
    }
})

const student=mongoose.model('student',studentSchema);
module.exports=student;