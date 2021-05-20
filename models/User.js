const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gallery: [
    {
      id: String,
      img: {
        data: Buffer,
        contentType: String,
      }
    }
  ],
});

module.exports = model("User", schema);
