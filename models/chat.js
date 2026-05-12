const {Schema, model} = require("mongoose");

const chatSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {timestamps: true});

const Chat = model("chat", chatSchema);

module.exports = Chat;