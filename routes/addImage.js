const { Router } = require("express");
const multer = require("multer");
const { ADD_IMAGE } = require("../constants/routes");
const User = require("../models/User");
require("dotenv").config();

const router = Router();
const upload = multer();

router.post(ADD_IMAGE, upload.any(), async (req, res) => {
  try {
    const { userId } = req.body;
    const file = req.files[0];
    const user = await User.findOne({ _id: userId });

    const { buffer } = file;

    const base64data = buffer.toString('base64')

    user.gallery = [
      ...user.gallery,
      {
        img: base64data,
      },
    ];

    await user.save();

    res.status(200).json({ gallery: user.gallery });
  } catch (err) {
    res.status(400).json({ message: "Error with request image" });
  }
});

module.exports = router;
