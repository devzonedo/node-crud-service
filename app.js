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


//jwt
const jwt = require('jsonwebtoken');
// Secret key for signing JWT tokens
const secretKey = 'your-secret-key';



mongoose.connect("mongodb+srv://devzonedo:7rT2AtRR10iZzoI7@cluster0.qrgeuyp.mongodb.net/crudappdb?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("database connected successfully..");
})
.catch(()=>{
    console.log("error in database connection");
});



// Middleware for validating bearer token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};





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



app.post('/login', (req, res) => {
    // Authenticate user and generate token
    const username = req.body.username;
    const user = { username: username };

    //const accessToken = jwt.sign(user, secretKey);
    // with expiry 
    const accessToken = jwt.sign(user, secretKey, { expiresIn: '1000' });
    res.json({ accessToken: accessToken });
});



app.get('/protected', authenticateToken , (req,res)=>{
    res.json({msg: "this is protected"});
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