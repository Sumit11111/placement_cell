//importing required packages
const {ObjectId}=require('mongodb');
const notifier = require("node-notifier");
const {Parser}=require('json2csv');
//imprting schema
const interview = require("../models/interviews");
const student = require("../models/students");
const user = require("../models/users");


//home page controller
module.exports.home=(req,res)=>{
    res.cookie("user_id","null",{maxAge:0});
    interview.find({},(err,interviews)=>{
        if(err)
        {
            console.log("error in fetching students in admin route");
            return;
        }
        return res.render('home',{
            title:"Home",
            interviews:interviews,
            })
        });
    
}
//sign In controller
module.exports.signIn=(req,res)=>{
    return res.render('signIn',{
        title:"signIn"
    })
}

//signup cntroller
module.exports.signUp=(req,res)=>{
    return res.render('signUp',{
        title:"signUp"
    })
}

//signout controller
module.exports.signOut=(req,res)=>{
    res.cookie("user_id","null",{maxAge:0});
    notifier.notify('Signed Out!!!');
    return res.redirect("/signIn");
}

//employee creation on signup click
module.exports.createUser=(req,res)=>{
    // console.log("gggggggggggggggggg:",req.body);
    // console.log(user);
    if(req.body.password!=req.body.cPassword)
    {
        return res.redirect("back");
    }
    user.findOne({email:req.body.email},function(err,newUser){
        if(err)
        {
            console.log("error in finding user during sign Up");
            return;
        }
        if(!newUser){
            user.create({email:req.body.email,password:req.body.password},(err,user)=>{
                if(err)
                {
                    console.log('error in creating user');
                    return;
                }
                notifier.notify('Account created Successfull!!!');
                return res.redirect('/signIn');
            })
        }else{
            res.redirect('/signIn');
        }
    })
}

//interview creation controller
module.exports.createInterview=(req,res)=>{

    interview.create({
        cName:req.body.cName,
        when:req.body.when,
        result:req.body.result
    },(err,newInterview)=>{
        if(err){
            console.log('Error in creating Interview details');
            return;
        }
        //console.log("*****",newInterview);
        const interviews=[];
        const students=[];
        student.find({},(err,student)=>{
            if(err)
            {
                console.log("error in fetching students in admin route");
                return;
            }
            students.push(student);
            interview.find({},(err,interview)=>{
                if(err)
                {
                    console.log("error in fetching students in admin route");
                    return;
                }
                interviews.push(interview);
                notifier.notify('Successfully Interview Created');
                return res.render('admin',{
                    title:"admin",
                    interviews:interviews,
                    students:students
                    })
                });
            }); 
    })
    
}

//after login home page for employees
module.exports.admin=(req,res)=>{
    //console.log("inside admin",req.body.email);
    user.findOne({email:req.body.email},(err,u)=>{
        console.log(req.body.email);  
        if(err)
        {
            console.log("error in finding user in db");
            return;
        }
        if(u)
        {
            if(u.password==req.body.password)
            {
                var interviews=[];
                var students=[];
                    student.find({},(err,student)=>{
                    if(err)
                    {
                        console.log("error in fetching students in admin route");
                        return;
                    }
                    students.push(student);
                    interview.find({},(err,interview)=>{
                        if(err)
                        {
                            console.log("error in fetching students in admin route");
                            return;
                        }
                        interviews.push(interview);
                        res.cookie("user_id",u.id);
                        notifier.notify('Successfully Logged In!!');
                        return res.render('admin',{
                            title:"admin",
                            interviews:interviews,
                            students:students
                        })  
                    }) 
                    });   
            }
            else
            {
                notifier.notify('Please check your Creds!!');
                return res.redirect("back");
                
            }
        }
        else{
            console.log("user not found");
            return res.redirect("back");
        }
    })

    
}

//student details creation and rendering success page
module.exports.success=(req,res)=>{
    student.create({
        sName:req.body.sName,
        batch:req.body.batch,
        college:req.body.college,
        status:req.body.status,
        dsa:req.body.dsa,
        webDev:req.body.webDev,
        react:req.body.react,
        cName:req.body.cName,
        result:req.body.result
    },(err,newStudent)=>{
        if(err){
            console.log('Error in creating student details');
            return;
        }
        notifier.notify('Successfully Submitted');
        return res.render('success',{
            title:"success"
        })
    })
}

//interview details page rendering controller on click of company name
module.exports.interviewDetails=(req,res)=>{
    var id=""+(req.params.cName).substr(1,30);
    var _id=new ObjectId(id);
    student.find({cName:_id},(err,students)=>{
        if(err)
        {
            console.log("error in getting data from database in interviewDetails route");
            return;
        }
        //console.log(students);
        interview.find({_id},(err,inter)=>{
            var companyName=inter[0].cName+" ";
            //console.log("sssss",students.length);
            return res.render('interviewDetails',{
                title:"Interview Details",
                companyName:companyName,
                students:students
            })
        })
         
    })
}

module.exports.download=function(req,res){
    const data=[];
    student.find({},(err,students)=>{
        const json2csv=new Parser({students});
        const csv=json2csv.parse(students);
        res.header('Content-Type','text/csv');
        return res.send(csv);
    })   
}