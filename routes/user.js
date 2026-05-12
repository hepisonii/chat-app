const express = require("express");
const app = express();
const userRouter = express.Router();
const User = require("../models/user");
const { setToken } = require("../services/auth");

userRouter.get("/signup", (req,res) => {
    return res.render("signup");
})

userRouter.post("/signup",async (req,res) => {
    const {name,email,password} = req.body;
    const checkEmail = await User.findOne({email});
    if(checkEmail){
        return res.render("signup", {
            error: "Email Already Exists"
        })
    }
    const user = await User.create({
        name,
        email,
        password
    });
    return res.redirect("/user/login");
});

userRouter.get("/login", (req,res) => {
    return res.render("login");
})

userRouter.post("/login", async (req,res) => {
    const {email,password} = req.body;
    const matchPassword = await User.matchPassword(email,password);
    if(!matchPassword){
        return res.render("login", {
            error: "Invalid Email or Password"
        })
    }
    const user = await User.findOne({email});
    const token = setToken(user);   
    res.cookie("uid", token,{
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    return res.redirect("/");
});

userRouter.get("/logout", (req,res) => {
    res.clearCookie("uid", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    return res.redirect("/");
});

module.exports = userRouter;