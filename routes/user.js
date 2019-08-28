'use strict'

var express        = require('express');
var UserController = require('../controllers/user');

var router  = express.Router();
var md_auth = require('../middlewares/authenticated');

// Rutas del usuario
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.get('/users/:page', md_auth.authenticated, UserController.getUsers);

module.exports = router;