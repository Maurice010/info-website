const { Event } = require('../models');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [['startDate', 'ASC']]
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
    const { name, startDate, endDate, category, location, description, link } = req.body;

    if (!name || !startDate || !endDate || !category || !location) {
      return res.status(400).json({
        message: 'Nazwa, data rozpoczęcia, data zakończenia, kategoria i lokalizacja są wymagane'
      });
    }

    const { id: ownerId } = req.user;

    const event = await Event.create({
      name,
      startDate,
      endDate,
      category,
      location,
      description,
      link,
      ownerId
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
    const { name, startDate, endDate, category, location, description, link } = req.body;
    const { id: userId } = req.user;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Wydarzenie nie zostało znalezione' });
    }

    if (event.ownerId !== userId) {
      return res.status(403).json({ message: 'Brak uprawnień do edycji tego wydarzenia' });
    }

    await event.update({
      name: name || event.name,
      startDate: startDate || event.startDate,
      endDate: endDate || event.endDate,
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
    const { id: userId } = req.user;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Wydarzenie nie zostało znalezione' });
    }

    if (event.ownerId !== userId) {
      return res.status(403).json({ message: 'Brak uprawnień do usunięcia tego wydarzenia' });
    }

    await event.destroy();
    res.json({ message: 'Wydarzenie zostało usunięte' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Błąd podczas usuwania wydarzenia' });
  }
};

const getLatestEvents = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 3;
      const events = await Event.findAll({
        order: [['createdAt', 'DESC']],
        limit,
      });
      res.json(events);
    } catch (error) {
      console.error('Błąd pobierania najnowszych wydarzeń:', error);
      res.status(500).json({ message: 'Błąd pobierania wydarzeń' });
    }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getLatestEvents
};
