const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MaterialSchema = new Schema({
  wtlink: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = Material = mongoose.model("material", MaterialSchema);
