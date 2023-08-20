const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./user.model');


const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://arjunkaushik845:7gT6A8fZlHvTC8GK@cluster0.aov1eao.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(bodyParser.json());


// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, email, engProLevel, mobNum, age } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, engProLevel, mobNum, age });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


