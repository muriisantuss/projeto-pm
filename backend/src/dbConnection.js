// src/dbConnection.js
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB conectado com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err);
  }
}

module.exports = connectDB;
