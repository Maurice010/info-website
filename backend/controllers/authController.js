const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Login i hasło są wymagane' });
  }

  const existingUser = await User.findOne({ where: { login } });
  if (existingUser) {
    return res.status(400).json({ message: 'Użytkownik już istnieje' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    login,
    password: hashedPassword,
    role: 'user',
  });

  res.status(201).json({ message: `Użytkownik ${login} zarejestrowany pomyślnie!` });
};

const login = async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ where: { login } });
  if (!user) {
    return res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
  }

  const token = jwt.sign(
    { id: user.id, login: user.login, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token });
};

const promoteToAdmin = async (req, res) => {
  const { login, adminPassword } = req.body;

  if (!login || !adminPassword) {
    return res.status(400).json({ message: 'Login i hasło do bazy danych są wymagane' });
  }

  if (adminPassword !== process.env.DB_PASSWORD) {
    return res.status(403).json({ message: 'Nieprawidłowe hasło do bazy danych' });
  }

  const user = await User.findOne({ where: { login } });
  if (!user) {
    return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
  }

  if (user.role === 'admin') {
    return res.status(400).json({ message: 'Użytkownik jest już adminem' });
  }

  user.role = 'admin';
  await user.save();

  res.json({ message: `Użytkownik ${login} został awansowany na admina` });
};

module.exports = { register, login, promoteToAdmin };
