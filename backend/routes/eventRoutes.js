const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getLatestEvents
} = require('../controllers/eventController');
const verifyToken = require('../middleware/auth');

router.get('/', getAllEvents);
router.get('/latest', getLatestEvents);
router.get('/:id', getEventById);

router.post('/', verifyToken, createEvent);
router.put('/:id', verifyToken, updateEvent);
router.delete('/:id', verifyToken, deleteEvent);

module.exports = router;
