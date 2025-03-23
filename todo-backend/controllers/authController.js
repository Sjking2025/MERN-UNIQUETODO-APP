const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
exports.register = async (req, res) => {
  const { username, password, email, fullName } = req.body;
  console.log('Register request received:', { username, password, email, fullName }); // Log the request

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    console.log('Hashed password:', hashedPassword); // Log the hashed password

    // Create a new user with the hashed password
    const user = new User({ username, password: hashedPassword, email, fullName });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message); // Log the error
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
    console.log('Login request received:', { username, password }); // Log the request
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ 
        token, 
        user: { 
          _id: user._id, 
          username: user.username, 
          email: user.email, 
          fullName: user.fullName 
        } 
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
