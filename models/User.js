const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gallery: [
    {
      img: String
    }
  ],
});

module.exports = model("User", schema);
