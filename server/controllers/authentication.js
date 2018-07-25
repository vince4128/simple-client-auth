const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);//sub for subject //subject of user.id //iat = issue at time
}

exports.signin = function(req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) }) // accessible from 
}

exports.signup = function(req,res,next){
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password'});
    }

    //see if user with a given email exist
    User.findOne({ email: email}, function(err, existingUser) {
        if(err) { return next(err);}

        //if user with email does exist, return an error
        if(existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

        //if user with email does not exist, create and save user record
        const user = new User({
            email:email,
            password:password
        });

        user.save(function(err){
            if(err) {return next(err); }

            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user)});
        });

        //Repond to request indicating the user was created

    });    
};