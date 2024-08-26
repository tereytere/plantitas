const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, require: true },
    surname: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true, enum: ["admin", "user"], default: "user" },
    image: { type: String },
    plants: [{
        id: { type: Schema.Types.ObjectId, ref: "plant" },
        size: { type: String, require: true, enum: ["mini", "medium", "maxi"], default: "mini" },
        status: { type: String, require: true, enum: ["good", "plague", "dead", "wish"], default: "good" },
    }]
}, {
    collection: "user",
    timestamps: true
})

const User = mongoose.model("user", userSchema)
module.exports = User;