require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt')
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config.json');
const jwt = require('jsonwebtoken');

const { authenticateToken } = require('./utilities')

const Customer = require('./models/customer.model');
const Developer = require('./models/developer.model');
const Game = require('./models/game.model');

//Conexión a MongoDB
mongoose.connect(config.connectionString);

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

// SignUp developer
app.post('/developers', async (req, res) => {
  try {
    const { companyName, email, password, companyDescription } = req.body;

    if (!companyName || !email || !password || !companyDescription) {
      return res
        .status(400)
        .json({ error: true, message: 'All fields are required' });
    }

    const [isCustomer, isDeveloper] = await Promise.all([
      Customer.findOne({ email }),
      Developer.findOne({ email })
    ]);

    if (isCustomer || isDeveloper) {
      return res
        .status(409)
        .json({ error: true, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const developer = new Developer({
      companyName,
      email,
      password: hashedPassword,
      companyDescription,
      userType: 'developer',
    });

    await developer.save();

    const accessToken = jwt.sign({ userId: developer._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '72h' });

    return res
      .status(201)
      .json({
        error: false,
        user: { companyName: developer.companyName, email: developer.email, companyDescription: developer.companyDescription, userType: developer.userType },
        accessToken,
        message: 'Developer registered successfully',
      });
  } catch (error) {
    console.error('Error creating developer account:', error);
    return res
      .status(500)
      .json({ error: true, message: 'An error occurred while creating developer account' });
  }
});

//SignUp customer
app.post('/customers', async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthDate } = req.body;

    if ( !firstName || !lastName || !email || !password || !birthDate ) {
      return res
        .status(400)
        .json({ error: true, message: 'All fields are required' });
  }

  const [isCustomer, isDeveloper] = await Promise.all([
    Customer.findOne({ email }),
    Developer.findOne({ email })
  ]);
  
  if (isCustomer || isDeveloper) {
    return res
      .status(409)
      .json({ error: true, message: 'User already exists'});
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);
  const customer = new Customer({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    birthDate,
    userType: 'customer',
  });

  await customer.save();

  const accessToken = jwt.sign(
    { userId: customer._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '72h',
    }
  );

  return res
    .status(201)
    .json({
    error: false,
    customer: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      password: customer.password,
      birthDate: customer.birthDate,
      userType: customer.userType
    },
    accessToken,
    message: 'Customer registered succesfully',
  });

} catch (error) {
  console.error('Error creating customer account:', error);
  return res
    .status(500)
    .json({ error: true, message: 'An error occurred while creating customer account' });
}
});

//Login usuario
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password ) {
      return res
        .status(400)
        .json({ error: true, message: 'Both email and password fields are required'});
    }

    const [customer, developer] = await Promise.all([
      Customer.findOne({ email }),
      Developer.findOne({ email })
    ]);

    const account = customer || developer;

    if (!account) {
      return res
        .status(401)
        .json({ error: true, message: 'User not found' })
    }

  const isPasswordValid = await bcrypt.compare(password, account.password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ error: true, message: 'Invalid credentials' })
  }

  const accessToken = jwt.sign (
    { userId: account._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '72h',
    }
  );

  return res
    .status(200)
    .json({
    error: false,
    user: { 
      email: account.email,
      userType: account.userType
    },
    accessToken,
    message: 'User logged in successfully',
  });

} catch (error) {
  console.error('Error during login:', error);
  return res
    .status(500)
    .json({ error: true, message: 'An error occurred during login' });
}
});

//GET users (customers or developers)
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user
    
    const [customer, developer] = await Promise.all([
      Customer.findOne({ _id: userId }),
      Developer.findOne({ _id: userId })
    ]);

    const account = customer || developer;

    if (!account) {
      return res
        .status(401)
        .json({ error: true, message: 'User not found'});
    }

    return res
      .status(200)
      .json({
      user: account,
      message: 'User retrieved successfully',
    });

  } catch (error) {
    console.error('Error retrieving user:', error);
    return res
      .status(500)
      .json({ error: true, message: 'An error occurred while retrieving the user' });
  }
});

//Agregar videojuego
app.post('/games', authenticateToken, async (req, res) => {
  try {
    const { title, description, category, price, status, minimumRequirements, recommendedRequirements, developer, imageUrl } = req.body;
    const { userId } = req.user

    if (!title || !description || !category || !price || !status ||!minimumRequirements || !recommendedRequirements || !developer || !imageUrl) {
      return res
      .status(400)
      .json({ error: true, message: 'All fields are required' });
    }

    const game = new Game({
      title,
      description,
      category,
      price,
      status,
      minimumRequirements,
      recommendedRequirements,
      developer: userId,
      imageUrl
    })

    await game.save();

    return res
    .status(201)
    .json({ game: game, message: 'Videogame created succesfully' });

  } catch (error) {
    console.error('Error creating videogame:', error);
    return res
    .status(500)
    .json({ error: true, message: 'An error occurred while creating videogame' });
  }
});

//GET videojuegos
app.get('/games', authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const games = await Game.find({ developer: userId });

    if (!games) {
      return res
        .status(404)
        .json({ error: true, message: 'No games found for this developer' });
    }

    return res
    .status(200)
    .json({ error: false, games: games, message: 'Games retrieved successfully' });
  }

  catch (error) {
    console.error('Error fetching games:', error);
    return res
    .status(500)
    .json({ error: true, message: 'An error occurred while fetching games' });
  }
});

// Configuración del puerto y levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});