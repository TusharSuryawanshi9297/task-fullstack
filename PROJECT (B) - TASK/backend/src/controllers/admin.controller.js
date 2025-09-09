const adminService = require("../services/admin.service");

const dashboard = async (_req, res) => {
  res.json(await adminService.dashboardCounts());
};

const createUser = async (req, res) => {
  res.status(201).json(await adminService.createUserAdmin(req.body));
};

const listUsers = async (req, res) => {
  const { q, role, sort, order, page, limit } = req.query;
  res.json(
    await adminService.listUsers({
      q,
      role,
      sort,
      order,
      page: Number(page) || 1,
      limit: Number(limit) || 100,
    })
  );
};

const createStore = async (req, res) => {
  res.status(201).json(await adminService.createStoreAdmin(req.body));
};

const listStores = async (req, res) => {
  const { q, sort, order, page, limit } = req.query;
  res.json(
    await adminService.listStores({
      q,
      sort,
      order,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    })
  );
};

module.exports = {
  dashboard,
  createUser,
  listUsers,
  createStore,
  listStores,
};
