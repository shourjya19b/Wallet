const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const User = require("../db");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const existingUser = User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({ message: "Username already taken" });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  return res
    .status(200)
    .json({ message: "User created successfully", token: token });
});

module.exports = router;
