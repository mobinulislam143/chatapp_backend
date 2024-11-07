const express =require('express');
const MsgController=require("../controllers/MsgController");
const Authmiddleware = require('../middleware/Authmiddleware');
const router =express.Router();


router.get('/:id', Authmiddleware, MsgController.getMessage)
router.post('/sendMessage/:id', Authmiddleware, MsgController.sendMessage)




module.exports=router;