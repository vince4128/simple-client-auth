const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique:true, lowercase:true },//make the email unique
    password: String
});

// On save Hook, encrypt password
// before saving a model, run this function (.pre 'save')
userSchema.pre('save', function(next){
    const user = this; // access the user model

    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt){
        if(err) { return next(err);}

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) { return next(err); }

            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

//adding methods to model
userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){ return callback(err); }
        else{
            callback(null, isMatch);
        }
    })// this = reference to usermodel
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;