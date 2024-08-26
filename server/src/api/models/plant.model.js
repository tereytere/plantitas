const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String }
}, {
    collection: "plant",
    timestamps: true
})

const Plant = mongoose.model("plant", userSchema)
module.exports = Plant;