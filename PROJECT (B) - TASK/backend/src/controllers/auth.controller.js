const authService = require("../services/auth.service");

const signup = async (req, res) => {
  const user = await authService.signup(req.body);
  res.status(201).json(user);
};

const login = async (req, res) => {
  res.json(await authService.login(req.body));
};

const updatePassword = async (req, res) => {
  await authService.updatePassword(req.user.id, req.body);
  res.json({ message: "Password updated" });
};

module.exports = {
  signup,
  login,
  updatePassword,
};
