const { Router } = require("express");
const { DELETE_IMAGE } = require("../constants/routes");
const User = require("../models/User");
require("dotenv").config();

const router = Router();

router.post(DELETE_IMAGE, async (req, res) => {
  try {
    const { userId, imageId } = req.body;
    const user = await User.findOne({ _id: userId });
    const filteredArray = user.gallery.filter((obj) => obj._id.toString() !== imageId);
    user.gallery = [...filteredArray]
    await user.save();
    res.status(200).json({ data: user.gallery });
  } catch (err) {
    res.status(400).json({ message: "Error with request image" });
  }
});

module.exports = router;
