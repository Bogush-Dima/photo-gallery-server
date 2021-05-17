const { Router } = require("express");
const { SIGN_IN } = require("../constants/routes");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = Router();
const { JWT_SECRET } = process.env;

router.post(
  SIGN_IN,
  [
    check("email", "Email is not correct").isEmail(),
    check("password", "Password must have min 6 symbols").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Not correct data",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router
