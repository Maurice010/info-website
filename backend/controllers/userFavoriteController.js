const { User, Event } = require('../models');

const getFavoriteEvents = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Event,
        as: 'favoriteEvents',
        through: { attributes: [] },
      },
    });
    res.json(user.favoriteEvents);
  } catch (err) {
    console.error('Błąd przy pobieraniu ulubionych:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

const addFavoriteEvent = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const event = await Event.findByPk(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Wydarzenie nie istnieje' });

    await user.addFavoriteEvent(event);
    res.status(201).json({ message: 'Dodano do ulubionych' });
  } catch (err) {
    console.error('Błąd przy dodawaniu do ulubionych:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

const removeFavoriteEvent = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const event = await Event.findByPk(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Wydarzenie nie istnieje' });

    await user.removeFavoriteEvent(event);
    res.json({ message: 'Usunięto z ulubionych' });
  } catch (err) {
    console.error('Błąd przy usuwaniu z ulubionych:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

module.exports = { getFavoriteEvents, addFavoriteEvent, removeFavoriteEvent };
