const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); //validation for username,email & password
const bcrypt = require('bcryptjs'); //package use for hashing of password(for user protection)
const jwt = require('jsonwebtoken'); //json web token(JWT)
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Harshitis&VERIFYSIGNATURE';  //specify verification signature


//ROUTE 1: Create a User using: POST "/api/auth/createuser"  -- no login required 
router.post('/createuser' , [
    body('name','custon msg').isLength({min: 3}),
    body('email','custom msg').isEmail(),
    body('password','custom msg').isLength({min: 5})
] , async (req,res)=>{
    //If there are errors, return Bed Reqiust and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //try-catch if server not work
    try {
        //check weather the user with this email exit
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry user with this email already exit"})
        }
        //password protection precess using bcrypt module
        const salt = await bcrypt.genSalt(10);
        const safePass = await bcrypt.hash(req.body.password,salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: safePass
        })
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        // res.json(user);
        res.json({authToken: authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error occured");
    }
})

//ROUTE 2: Authenticate a User using: POST "/api/auth/login"  -- no login required 
router.post('/login' , [
    body('email','custom msg').isEmail(),
    body('password').exists()
] , async (req,res)=>{
    //If there are errors, return Bed Reqiust and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //try-catch to check weather entered user information are correct such as email and password
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        let comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        //payload -- user information from database
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken: authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error occured");
    }
})

// ROUTE 3:Get loggedin user detail Using POST "/api/auth/getuser" ,Login required
router.post('/getuser', fetchuser, async (req,res)=>{
    try {
        const userId = req.user.id
        let user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error occured");
    }
}) 
module.exports = router