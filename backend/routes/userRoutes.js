const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateCurrentUser,
  changePassword,
  deleteUser,
  toggleUserStatus
} = require('../controllers/userController');

router.get('/', getAllUsers);

router.get('/profile', getCurrentUser);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.put('/profile/update', updateCurrentUser);

router.put('/profile/password', changePassword);

router.delete('/:id', deleteUser);

module.exports = router; 