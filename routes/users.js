const express = require('express');
const router = express.Router();

const ObjectId = require('mongodb').ObjectId;

const User = require('../models/user.js');

const jwt = require('jsonwebtoken');
const {authenticateToken, secretKey} = require('../authMiddleware');

router.post("/register", async (req,res,next)=>{
    console.log("user>>register");


    try{

        
                const user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                });

                console.log(user);

                await user.save();


                res.status(200).json({
                    message: "user created successfully",
                    data: user
                });


    }catch(error){
        console.log('An error occured:', error);
        res.status(401).json({
            message: "Unable to create user, invalid input found"
        });

    }

});







router.post("/login", async (req,res,next)=>{
console.log("user>>login");


const { username , password } = req.body;

            try{


                const user = await User.findOne({username , password});

                if(user){


                    const accessToken = jwt.sign(username, secretKey, { expiresIn: '1000' });
                    
                    res.status(200).json({
                        message: "login success",
                        user: {
                            username: user.username,
                            email: user.email,
                            id:user._id
                        },
                        accessToken: accessToken
                    });

                }else{

                    res.status(401).json({
                        message: "Invalid username or password"
                    });
                }

            }catch(error){
                console.log('An error occured:', error);
                res.status(401).json({
                    message: "Unable to login"
                });
            }


});






module.exports = router;


