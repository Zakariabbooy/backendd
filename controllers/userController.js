const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    const safeUser = { _id: user._id, name: user.name, email: user.email, date: user.date };
    return res.status(201).json(safeUser);
  } catch (err) {
    console.error('registerUser error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const safeUser = { _id: user._id, name: user.name, email: user.email, date: user.date };
    return res.json(safeUser);
  } catch (err) {
    console.error('loginUser error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
