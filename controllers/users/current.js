const current = async (req, res, next) => {
  res.json({
    email: req.user.email,
  });
};
module.exports = current;
