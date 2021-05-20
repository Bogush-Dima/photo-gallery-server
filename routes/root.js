const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { ROOT } = require("../constants/routes");
const User = require("../models/User");
require("dotenv").config();

const router = Router();
const { JWT_SECRET } = process.env;

router.post(ROOT, async (req, res) => {
  try {
    const { token } = req.body;
    const userId = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        return res.userId;
      }
    });

    const user = await User.findOne({ _id: userId });
    const {id, email} = user
    res.json({ userId: id, email: email });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
