const mongoose = require("mongoose");
const { Schema } = mongoose;

let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let now = time + " | " + date;

const schemaNotes = new Schema({
  // this help to keep notes only to specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: String,
    default: now,
  },
});

module.exports = mongoose.model("notes", schemaNotes);
