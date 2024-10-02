require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt')
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config.json');
const jwt = require('jsonwebtoken');

const User = require('./models/user.model');

//Conexión a MongoDB
mongoose.connect(config.connectionString);

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());



// SignUp usuario
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthDate, userType } = req.body;

    if ( !firstName || !lastName || !email || !password || !birthDate || !userType ) {
      return res
        .status(400)
        .json({ error: true, message: 'All fields are required'});
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res
      .status(409)
      .json({ error: true, message: 'User already exists'});
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    birthDate,
    userType,
  });

  await user.save();

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '72h',
    }
  );

  return res.status(201).json({
    error: false,
    user: { 
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      userType: user.userType
    },
    accessToken,
    message: 'User registered succesfully',
  });

} catch (error) {
  console.error('Error creating account:', error);
  return res.status(500).json({
    error: true,
    message: 'An error occurred while creating the account'
  });
}
});

//Login usuario
app.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password ) {
      return res
        .status(400)
        .json({ error: true, message: 'Email and Password fields are required'});
  }
  });

// Configuración del puerto y levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});