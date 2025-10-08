const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

exports.register = async (email, password) => {
  const existing = UserModel.getUserByEmail(email);
  if (existing) throw new Error("User already exists");

  const newUser = await UserModel.registerUser(email, password);
  return { id: newUser.id, email: newUser.email };
};

exports.login = async (email, password, secretKey) => {
  const user = UserModel.getUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid email or password");

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
  return { token };
};
