const { Router } = require("express");
const uniqid = require("uniqid");
const multer = require("multer");
const { ADD_IMAGE } = require("../constants/routes");
const User = require("../models/User");
require("dotenv").config();

const router = Router();
const upload = multer();

router.put(ADD_IMAGE, upload.any(), async (req, res) => {
  try {
    const { userId } = req.body;
    const file = req.files[0];
    const user = await User.findOne({ _id: userId });
    user.gallery = [...user.gallery, { id: uniqid(), ...file }];
    await user.save();
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: "Error with request image" });
  }
});

module.exports = router;
