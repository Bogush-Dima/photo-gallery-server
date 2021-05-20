const { Router } = require("express");
const { GET_IMAGES } = require("../constants/routes");
const User = require("../models/User");
require("dotenv").config();

const router = Router();

router.get(GET_IMAGES, async (req, res) => {
  try {
    const userId = "60a6439f98bc3f0a088b2756";
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ gallery: user.gallery });
  } catch (err) {
    res.status(400).json({ message: "Error with request image" });
  }
});

module.exports = router;
