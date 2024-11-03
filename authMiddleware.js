//jwt 
const jwt = require('jsonwebtoken');
// keep the secret key only with me
const secretkey = 'your-secret-key';

// creating the middleware for bearer token 
const authenticationToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("token-found: "+ token);

    if(token == null) return res.sendStatus(401);

    jwt.verify(token , secretkey , (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });

};



module.exports = {authenticationToken , secretkey};
