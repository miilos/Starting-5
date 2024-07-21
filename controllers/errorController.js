module.exports = (err, req, res, next) => {
  const message = err.message.startsWith("Lineup")
    ? err.message.split(":")[2].trim()
    : err.message;

  res.status(400).json({
    status: "error",
    message: message,
  });
};
