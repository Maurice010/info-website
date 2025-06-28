const { Event } = require('../models');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [['date', 'ASC']]
    });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Błąd podczas pobierania wydarzeń' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Wydarzenie nie zostało znalezione' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Błąd podczas pobierania wydarzenia' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { name, date, category, location, description, link } = req.body;

    if (!name || !date || !category || !location) {
      return res.status(400).json({ 
        message: 'Nazwa, data, kategoria i lokalizacja są wymagane' 
      });
    }

    const event = await Event.create({
      name,
      date,
      category,
      location,
      description,
      link
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Błąd podczas tworzenia wydarzenia' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, category, location, description, link } = req.body;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Wydarzenie nie zostało znalezione' });
    }

    await event.update({
      name: name || event.name,
      date: date || event.date,
      category: category || event.category,
      location: location || event.location,
      description: description !== undefined ? description : event.description,
      link: link !== undefined ? link : event.link
    });

    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Błąd podczas aktualizacji wydarzenia' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Wydarzenie nie zostało znalezione' });
    }

    await event.destroy();
    res.json({ message: 'Wydarzenie zostało usunięte' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Błąd podczas usuwania wydarzenia' });
  }
};

const getEventsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const events = await Event.findAll({
      where: { category },
      order: [['date', 'ASC']]
    });
    
    res.json(events);
  } catch (error) {
    console.error('Error fetching events by category:', error);
    res.status(500).json({ message: 'Błąd podczas pobierania wydarzeń według kategorii' });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByCategory
}; 