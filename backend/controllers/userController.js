const { User } = require('../models');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Błąd podczas pobierania użytkowników' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik nie został znaleziony' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Błąd podczas pobierania użytkownika' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik nie został znaleziony' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Błąd podczas pobierania profilu użytkownika' });
  }
};

const createUser = async (req, res) => {
  try {
    const { login, password, role } = req.body;

    if (!login || !password) {
      return res.status(400).json({ 
        message: 'Login i hasło są wymagane' 
      });
    }

    const existingUser = await User.findOne({ 
      where: { login } 
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik z tym loginem już istnieje' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      login,
      password: hashedPassword,
      role: role || 'user'
    });

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Błąd podczas tworzenia użytkownika' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { login, email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik nie został znaleziony' });
    }

    if (login && login !== user.login) {
      const existingUser = await User.findOne({ where: { login } });
      if (existingUser) {
        return res.status(400).json({ message: 'Użytkownik z tym loginem już istnieje' });
      }
    }

    await user.update({
      login: login || user.login,
      email: email !== undefined ? email : user.email,
      role: role || user.role,
    });

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Błąd podczas aktualizacji użytkownika' });
  }
};

const updateCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik nie został znaleziony' });
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating current user:', error);
    res.status(500).json({ message: 'Błąd podczas aktualizacji profilu użytkownika' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: 'Aktualne hasło i nowe hasło są wymagane' 
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik nie został znaleziony' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Aktualne hasło jest nieprawidłowe' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({ message: 'Hasło zostało zmienione pomyślnie' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Błąd podczas zmiany hasła' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik nie został znaleziony' });
    }

    await user.destroy();
    res.json({ message: 'Użytkownik został usunięty' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Błąd podczas usuwania użytkownika' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  updateCurrentUser,
  changePassword,
  deleteUser
}; 