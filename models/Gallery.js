const { Schema, model } = require("mongoose");

const schema = new Schema({
  userId: { type: String, required: true, unique: true },
  photos: [{ type: String }],
});

module.exports = model('Gallery', schema)
