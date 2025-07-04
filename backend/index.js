require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const userEventRoutes = require('./routes/userEventRoutes');
const userFavoriteRoutes = require('./routes/userFavoriteRoutes');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Działa' });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/me/events', userEventRoutes);
app.use('/api/users/me/favorites', userFavoriteRoutes);

app.listen(port, () => {
  console.log(`Backend działa na porcie ${port}`);
});
