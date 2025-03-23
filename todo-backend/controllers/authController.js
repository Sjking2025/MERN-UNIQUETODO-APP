const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
exports.register = async (req, res) => {
  const { username, password, email, fullName } = req.body;
  console.log('Register request received:', { username, password, email, fullName });

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    // Create a new user with the hashed password
    const user = new User({ username, password: hashedPassword, email, fullName });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message);
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email or username already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Login User
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request received:', { username, password });

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log('User found in database:', user);

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: err.message });
  }
};