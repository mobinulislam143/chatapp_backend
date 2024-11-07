const express =require('express');
const UserController=require("../controllers/UserController");
const Authmiddleware = require('../middleware/Authmiddleware');
const router =express.Router();



router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

router.get('/users', Authmiddleware, UserController.Users)



module.exports=router;