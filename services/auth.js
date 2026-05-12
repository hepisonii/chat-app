const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function setToken(user){
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    },secret);
}

function verifyToken(token){
    if(!token) return;
    return jwt.verify(token,secret);
}

module.exports = {
    setToken,
    verifyToken
}