const router = require('express').Router();
const UserController = require('./controller');
const { check } = require('../common/middleware/authenticate');
const AuthController = require('../auth/controller');

// Mount routes
router.get('/', check, UserController.getUser);
router.get('/all', check, UserController.getAllUsers);
router.post('/login', AuthController.login);

module.exports = router;