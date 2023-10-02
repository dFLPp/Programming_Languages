const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'must provide name'],
        maxlength: 10,
        minlength: 3
    },
    email:{
        type: String,
        required: [true, 'must provide email'],
        maxlength: 25,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "must provide valid email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "must provide password"],
        minlength: 6
    }
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function(){
    return jwt.sign({userID: this._id, username: this.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(maybePassword){
    const isEqual = await bcrypt.compare(maybePassword, this.password);
    return isEqual;
}

module.exports = mongoose.model('users', userSchema);