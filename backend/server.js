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
const Review = require('./models/review.model');

// Conexión con MongoDB
mongoose.connect(config.connectionString);

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// SignUp developer
app.post('/developers', async (req, res) => {
  try {
    const { companyName, email, password, companyDescription, logoImageUrl } = req.body;

    if (!companyName || !email || !password || !companyDescription, !logoImageUrl) {
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
      logoImageUrl,
      userType: 'developer',
    });

    await developer.save();

    const accessToken = jwt.sign({ userId: developer._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '72h' });

    return res
      .status(201)
      .json({
        error: false,
        user: { companyName: developer.companyName, email: developer.email, companyDescription: developer.companyDescription, logoImageUrl: developer.logoImageUrl, userType: developer.userType },
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

// SignUp customer
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

// Login user (developer o customer)
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

// GET users (developer o customer)
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

// Crear juego
app.post('/games', authenticateToken, async (req, res) => {
  try {
    const { 
      title,
      description,
      category,
      price,
      os,
      language,
      playersQty,
      minimumRequirements,
      recommendedRequirements,
      status,
      imageUrl
    } = req.body;
    const { userId } = req.user

    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !os ||
      !language ||
      !playersQty ||
      !minimumRequirements ||
      !recommendedRequirements ||
      !status ||
      !imageUrl
    ) {
      return res
      .status(400)
      .json({ error: true, message: 'All fields are required' });
    }

    const game = new Game({
      title,
      description,
      category,
      price,
      os,
      language,
      playersQty,
      minimumRequirements: {
        cpu: minimumRequirements.cpu,
        memory: minimumRequirements.memory,
        gpu: minimumRequirements.gpu
      },
      recommendedRequirements: {
        cpu: recommendedRequirements.cpu,
        memory: recommendedRequirements.memory,
        gpu: recommendedRequirements.gpu
      },
      status,
      developer: userId,
      imageUrl
    })

    await game.save();

    return res
    .status(201)
    .json({ game: game, message: 'Game created successfully' });

  } catch (error) {
    console.error('Error creating game:', error);
    return res
    .status(500)
    .json({ error: true, message: 'An error occurred while creating game' });
  }
});

// GET todos los juegos de un developer
app.get('/developers/:developerId/games', authenticateToken, async (req, res) => {
  const { developerId } = req.params;

  try {
    const games = await Game.find({ developer: developerId });

    if (!games || games.length === 0 ) {
      return res
        .status(404)
        .json({ error: true, message: 'No games found for this developer' });
    }

    return res
    .status(200)
    .json({ error: false, games, message: 'Games from developer retrieved successfully' });
  }

  catch (error) {
    console.error('Error fetching games:', error);
    return res
    .status(500)
    .json({ error: true, message: 'An error occurred while fetching games' });
  }
});

// GET datos de un juego específico
app.get('/games/:gameId', authenticateToken, async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId)
      .populate('developer', 'companyName companyDescription logoImageUrl')
      .populate('review', 'firstName lastName content rating createdAt');

    if (!game) {
      return res
        .status(404)
        .json({ error: true, message: 'Game not found' });
    }

    const orderedGame = {
      title: game.title,
      description: game.description,
      category: game.category,
      price: game.price,
      os: game.os,
      language: game.language,
      playersQty: game.playersQty,
      minimumRequirements: {
        cpu: game.minimumRequirements.cpu,
        memory: game.minimumRequirements.memory,
        gpu: game.minimumRequirements.gpu
      },
      recommendedRequirements: {
        cpu: game.recommendedRequirements.cpu,
        memory: game.recommendedRequirements.memory,
        gpu: game.recommendedRequirements.gpu
      },
      developer: {
        companyName: game.developer.companyName,
        companyDescription: game.developer.companyDescription,
        logoImageUrl: game.developer.logoImageUrl
      },
      review: {
        firstName: game.review.firstName,
        lastName: game.review.lastName,
        content: game.review.content,
        rating: game.review.rating,
        createdAt: game.review.createdAt
      },
      imageUrl: game.imageUrl
    };

    return res
    .status(200)
    .json({ error: false, game: orderedGame, message: 'Game retrieved successfully' });
  }

  catch (error) {
    console.error('Error fetching games:', error);
    return res
    .status(500)
    .json({ error: true, message: 'An error occurred while fetching game' });
  }
});

// GET juegos con filtros
app.get('/games', async (req, res) => {
  try {
    const { category, price, os, language, playersQty, rating } = req.query;

    const filters = {};

    if (category) filters.category = category;
    if (price) filters.price = price;
    if (os) filters.os = os;
    if (language) filters.language = language;
    if (playersQty) filters.playersQty = playersQty;
    if (rating) filters.rating = rating;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const orderBy = req.query.orderBy || 'price';
    const order = req.query.order === 'desc' ? -1 : 1;

    const games = await Game.find(filters)
      .sort({ [orderBy]: order })
      .skip(skip)
      .limit(limit);

    if (!games || games.length === 0) {
      return res
        .status(404)
        .json({ error: true, message: 'No games found with these filters' });
    }

    return res
      .status(200)
      .json({ error: false, games, message: 'Games retrieved successfully', page, limit });

  } catch (error) {
    console.error('Error fetching games:', error);
    return res.status(500).json({ error: true, message: 'An error occurred while fetching games' });
  }
});


// Configuración del puerto y levantar el server
const PORT = process.env.PORT || 3800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});