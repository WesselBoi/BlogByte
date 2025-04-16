require('dotenv').config();
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET_KEY

function setUser(user){
    return jwt.sign({
        _id : user._id,
        email : user.email,
        name : user.name,
    }, 
    secret)
}

function getUser(token){
    if (!token) return null;
    return jwt.verify(token , secret)
}

module.exports={
    getUser,
    setUser
}