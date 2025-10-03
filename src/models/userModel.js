const bcrypt = require("bcrypt");

let users = [];
let currentId = 1;

async function registerUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: currentId++,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  return newUser;
}

function getUserByEmail(email) {
  return users.find((u) => u.email === email);
}

module.exports = { registerUser, getUserByEmail };
