const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByCategory
} = require('../controllers/eventController');

router.get('/', getAllEvents);

router.get('/category/:category', getEventsByCategory);

router.get('/:id', getEventById);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router; 