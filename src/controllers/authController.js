const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

const SECRET_KEY = process.env.JWT_SECRET || "supersecret"; // use .env


exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const existing = UserModel.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = await UserModel.registerUser(email, password);
  res.status(201).json({ id: newUser.id, email: newUser.email });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = UserModel.getUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
};
