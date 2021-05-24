const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existigUser = await User.findOne({ email });

    if (!existigUser)
      return res.status(404).jsoon({ message: "User doesn't exists." });

    const correctPassword = await bcrypt.compare(
      password,
      existigUser.password
    );

    if (!correctPassword)
      return res.status(400).json({ message: "Password is not correct." });

    const token = jwt.sign(
      { email: existigUser.email, id: existigUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existigUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existigUser = await User.findOne({ email });
    if (existigUser)
      return res
        .status(400)
        .json({ message: "User with this email already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { signin, signup };
