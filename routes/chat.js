const Chat = require("../models/chat");
const User = require("../models/user")
const express = require('express');
const chatRouter = express.Router();

chatRouter.get("/:id",async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    console.log("User: ",user);
    const userId = req.user._id;
    const allMessages = await Chat.find({
        $or: [
            {sender: userId, receiver: id},
            {sender: id, receiver: userId}
        ]    
    }).sort({createdAt: 1});
    return res.render("chat", {
        userId,
        user,
        allMessages
    });
});

chatRouter.post("/:id", async (req,res) => {
    console.log("Request Received");
    const id = req.params.id;
    const user = await User.findById(id);
    const {content} = req.body;
    console.log("Message: ", req.body);
    const message = await Chat.create({
        content,
        sender: req.user._id,
        receiver: id,
    })
    console.log("Message details: ", message);
    return res.redirect(`/chat/${id}`);
})

module.exports = chatRouter;