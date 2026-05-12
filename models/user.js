const {Schema, model} = require("mongoose");
const {createHmac, randomBytes} = require("crypto")
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
},{timestamps: true});

userSchema.pre("save", async function(){
    const user = this;
    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString("hex");
    const hashed = createHmac("sha256", salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashed;
});

userSchema.static("matchPassword", async function (email,password){
    const user  = await User.findOne({email});
    const salt = user.salt;
    const providedHash = createHmac("sha256", salt).update(password).digest("hex");
    const hashed = user.password;
    if(providedHash === hashed){
        return true;
    }
    return false;
});

const User = model("user", userSchema);

module.exports = User;
