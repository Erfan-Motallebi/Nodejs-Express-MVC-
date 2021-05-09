const authorize = function (req, res, next) {
  const { name, password } = req.query;
  if (name && password) {
    next();
  } else {
    res.status(401).json({ success: false, data: [] });
  }
};

module.exports = { authorize };
