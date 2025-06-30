const { User, Event } = require('../models');

const getSavedEvents = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Event,
        as: 'savedEvents',
        through: { attributes: [] },
      },
    });
    res.json(user.savedEvents);
  } catch (err) {
    console.error('Błąd przy pobieraniu zapisanych wydarzeń:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

const addEventToUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const event = await Event.findByPk(req.params.eventId);

    if (!event) return res.status(404).json({ message: 'Wydarzenie nie istnieje' });

    await user.addSavedEvent(event);
    res.status(201).json({ message: 'Dodano wydarzenie do zapisanych' });
  } catch (err) {
    console.error('Błąd przy dodawaniu wydarzenia:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

const removeEventFromUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const event = await Event.findByPk(req.params.eventId);

    if (!event) return res.status(404).json({ message: 'Wydarzenie nie istnieje' });

    await user.removeSavedEvent(event);
    res.json({ message: 'Usunięto wydarzenie z zapisanych' });
  } catch (err) {
    console.error('Błąd przy usuwaniu wydarzenia:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

module.exports = {
  getSavedEvents,
  addEventToUser,
  removeEventFromUser,
};
