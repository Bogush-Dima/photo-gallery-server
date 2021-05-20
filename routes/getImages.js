const { Router } = require("express");
const { GET_IMAGES } = require("../constants/routes");
const User = require("../models/User");
require("dotenv").config();

const router = Router();

router.get(GET_IMAGES, async (req, res) => {
  try {
    const userId = "60a6751101ad3c1da0aaea3a";
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ data: user.gallery[0].img.data });
  } catch (err) {
    res.status(400).json({ message: "Error with request image" });
  }
});

module.exports = router;
