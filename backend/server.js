const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API is running');
});

//Conexión a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado');
    }  catch (err) {
        console.error(err.message);
        process.exit(1);
  }
};

// Llamada a la función para conectar a la DB
connectDB();
 

// Configuración del puerto y levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));