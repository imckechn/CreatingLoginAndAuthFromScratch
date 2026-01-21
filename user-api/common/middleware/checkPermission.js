const sequelize = require('../database');
const defineUser = require('../models/User');
const User = defineUser(sequelize);

exports.has = (requiredRole) => async (req, res, next) => {
  const user = await User.findByPk(req.user.userId);
  if (!user || user.role !== requiredRole) {
    return res.status(403).json({ error: `Requires ${requiredRole} role` });
  }
  next();
};