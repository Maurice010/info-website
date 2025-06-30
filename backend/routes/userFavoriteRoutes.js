const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getFavoriteEvents,
  addFavoriteEvent,
  removeFavoriteEvent,
} = require('../controllers/userFavoriteController');

router.use(auth);

router.get('/', getFavoriteEvents);
router.post('/:eventId', addFavoriteEvent);
router.delete('/:eventId', removeFavoriteEvent);

module.exports = router;
