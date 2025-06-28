const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const EventModel = require('./event');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const User = UserModel(sequelize);
const Event = EventModel(sequelize);

sequelize.sync()
  .then(() => console.log('Połączono z bazą danych i zsynchronizowano modele'))
  .catch((err) => console.error('Błąd połączenia z bazą danych:', err));

module.exports = {
  sequelize,
  User,
  Event,
};
