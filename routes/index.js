const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log("router loaded");
//different routes
router.get('/',homeController.home);
router.get('/signIn',homeController.signIn);
router.get('/signUp',homeController.signUp);
router.get('/signOut',homeController.signOut);
router.get('/interviewDetails/:cName',homeController.interviewDetails)
router.get('/download',homeController.download);

router.post('/admin',homeController.admin);
router.post('/success',homeController.success);
router.post('/createUser',homeController.createUser)
router.post('/createInterview',homeController.createInterview);


module.exports=router;