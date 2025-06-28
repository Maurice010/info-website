const express = require('express');
const router = express.Router();
const { register, login, promoteToAdmin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/promote', promoteToAdmin);

module.exports = router;
