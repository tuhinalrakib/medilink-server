const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
require('dotenv').config()

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

router.post("/", (req, res) => {
  const email = req.body.email
  const user = { email: email }
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

  res.cookie('token', token, cookieOptions)
    .send({ message: "JWT Created Successfully" })
})

router.post('/logout', (req, res) => {
  res
    .clearCookie("token", { ...cookieOptions, maxAge: 0 })
    .send({ success: true });
});

module.exports = router