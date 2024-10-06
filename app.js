const express = require('express');


// external routes 
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');


const app = express();
const bodyPaser = require('body-parser');

const Post = require('./models/post.js');

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

app.use(bodyPaser.json());


const jwt = require('jsonwebtoken');
const {authenticateToken, secretKey} = require('./authMiddleware');


mongoose.connect("mongodb+srv://devzonedo:7rT2AtRR10iZzoI7@cluster0.qrgeuyp.mongodb.net/crudappdb?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("database connected successfully..");
})
.catch(()=>{
    console.log("error in database connection");
});




app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type , Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
});



app.use((req,res,next) => {
    console.log('this is from express');
    next();
});




// access custom routes 
app.use('/api/post',postsRoutes);
app.use('/api/user',usersRoutes);
app.use('/api/task',tasksRoutes);



app.get("/healthcheck",(req,res,next)=>{
    console.log(">>/healthcheck");
    res.status(200).json({
        message: "server running ...... "
    });
});





module.exports = app;