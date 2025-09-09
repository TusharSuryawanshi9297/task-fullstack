const storeService = require("../services/store.service");

const browse = async (req, res) => {
  const { q, sort, order, page, limit } = req.query;
  res.json(
    await storeService.searchStores({
      userId: req.user.id,
      q,
      sort,
      order,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    })
  );
};

const rate = async (req, res) => {
  res
    .status(201)
    .json(await storeService.rateStore({ userId: req.user.id, ...req.body }));
};

module.exports = {
  browse,
  rate,
};
