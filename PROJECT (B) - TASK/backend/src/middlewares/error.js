function notFound(_req, res, _next) {
  res.status(404).json({ message: "Route not found" });
}

function errorHandler(err, _req, res, _next) {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
}

module.exports = {
  notFound,
  errorHandler,
};
