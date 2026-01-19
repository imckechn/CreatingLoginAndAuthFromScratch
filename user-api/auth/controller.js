const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sequelize = require('../common/database');
const defineUser = require('../common/models/User');
const User = defineUser(sequelize);

const encryptPassword = (password) =>
  crypto.createHash('sha256').update(password).digest('hex');

const generateAccessToken = (username, userId) =>
  jwt.sign({ username, userId }, 'your-secret-key', { expiresIn: '24h' });

exports.register = async (req, res) => {
  try {
    console.log("A");
    console.log(JSON.stringify(req.body));
    const { username, email, password, firstName, lastName } = req.body;
    console.log("B");
    const encryptedPassword = encryptPassword(password);
    console.log("C");
    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
      firstName,
      lastName
    });
    console.log("D");

    const accessToken = generateAccessToken(username, user.id);
    console.log("Access token generated");

    res.status(201).json({
      success: true,
      user: { id: user.id, username: user.username, email: user.email },
      token: accessToken
    });

  } catch (err) {
    console.log("Failed to register user: " + err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};