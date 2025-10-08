const AuthService = require("../services/authService");

const SECRET_KEY = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.register(email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password, SECRET_KEY);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
