const ownerService = require("../services/owner.service");

const dashboard = async (req, res) => {
  res.json(await ownerService.ownerDashboard(req.user.id));
};

module.exports = {
  dashboard,
};
