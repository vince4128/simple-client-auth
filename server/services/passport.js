const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Localstrategy = require('passport-local');

/*

    3 use case :

    1 : Signing up -> verify email is not in use -> return token
    2 : Signing in -> verify email/password -> return token | (local strategy)
    3 : Auth'd request -> verify token -> Resource Access | (jwt strategy)

*/

// Strategy = a method to authenticate a user

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new Localstrategy(
    localOptions,
    function(email, password, done){
        //verify username and password, call done with the user
        //if its the correct username and password
        //otherwise, call done with false
        User.findOne({ email:email}, function(err, user){
            if(err) { return done(err); }
            if(!user) { return done(null, false); }

            //compare password - is `password` equal to user.password ?
            user.comparePassword(password, function(err, isMatch){
                if(err){ return done(err); }
                if(!isMatch) {return done(null, false);}

                return done(null, user); //user get assigned to req.user
            })
        });
    }
);

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

    // payload sub and iat of the token
    // See if the user ID in the payload exists in our database
    // if it does, call 'done' with that
    // otherwise, call done without a user object
    User.findById(payload.sub, function(err,user){
        if(err) {
            return done(err, false);
        }

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });

});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);