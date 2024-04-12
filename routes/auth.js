// Package imports
const Router = require('express').Router();

// Local imports
const {register, login} = require('../controllers/auth.js');

// Routing

Router.route('/register').post(register);

Router.route('/login/').post(login);

module.exports = Router;