const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/');

router
    .post('/login', controller.logIn)
    .get('/logout', auth, controller.logOut)

module.exports = router;
