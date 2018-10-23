const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  location: {
    type: String
  },
  celphone: {
    type: String,
    required: true
  },
  wapp: {
    type: Boolean
  },
  social: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    }
  },
  homework: [
    {
      link: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
