const {verifyToken} = require("../services/auth");

function checkAuth(){
    return (req,res,next) => {
    const token = req.cookies?.uid;
    console.log("Cookies: ",req.cookies);
    if(!token) {
        return next();
    }
    const user = verifyToken(token);
    if(!user){
        return next();
    }
    req.user = user;
    return next();
    }
}

module.exports = checkAuth;