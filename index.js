require("dotenv").config();
const express = require("express");
const http = require("http");

const app = express();
const PORT = 8000;
const server = http.createServer(app);
const path = require("path");

const cookie_parser = require("cookie-parser");
const {Server} = require("socket.io");
const userRouter = require("./routes/user");
const checkAuth = require("./middlewares/auth");
const User = require("./models/user");
const connectMongoDB = require("./connections/user");
const chatRouter = require("./routes/chat");


connectMongoDB(process.env.MONGO_URL);
const io = new Server(server);  

io.on("connection", (socket) => {
    socket.on("join", (senderId) => {
        socket.join(senderId);
    })
    socket.on("message", ({senderId, receiverId, message}) => {
        io.to(senderId).emit("receivedMessage", {
            sender: senderId,
            receiver: receiverId,
            message
        })
        io.to(receiverId).emit("receivedMessage", {
            sender: senderId,
            receiver: receiverId,
            message
        });
    });
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookie_parser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(checkAuth());

app.use("/user", userRouter);
app.use("/chat", chatRouter);

app.get("/", async (req,res) => {
    const user = req.user;
    const allUsers = await User.find({});
    if(!user){
        return res.redirect("/user/login");
    }
    return res.render("home",{
        user,
        allUsers
    });
});

server.listen(process.env.PORT || "8000", () => {
});
