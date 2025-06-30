const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getSavedEvents,
  addEventToUser,
  removeEventFromUser,
} = require('../controllers/userEventController');

router.use(auth);

router.get('/', getSavedEvents);
router.post('/:eventId', addEventToUser);
router.delete('/:eventId', removeEventFromUser);

module.exports = router;
