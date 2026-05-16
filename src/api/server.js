const express = require('express');
const { seedUsers, cleanUsers } = require('../seeders/postgres/userSeeder');
const { connectMongo, seedProducts, cleanProducts } = require('../seeders/mongo/productSeeder');
const pool = require('../config/database');
require('dotenv').config();

const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Seed usuarios en PostgreSQL
app.post('/seed/users', async (req, res) => {
  try {
    const count = req.body.count || 10;
    const users = await seedUsers(count);
    res.json({ success: true, count: users.length, sample: users[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Limpiar usuarios
app.delete('/seed/users', async (req, res) => {
  try {
    await cleanUsers();
    res.json({ success: true, message: 'Users table cleaned' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Seed productos en MongoDB
app.post('/seed/products', async (req, res) => {
  try {
    const count = req.body.count || 10;
    await connectMongo();
    const products = await seedProducts(count);
    res.json({ success: true, count: products.length, sample: products[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Limpiar productos
app.delete('/seed/products', async (req, res) => {
  try {
    await connectMongo();
    await cleanProducts();
    res.json({ success: true, message: 'Products collection cleaned' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }

});

// Reset completo — limpia todo antes de un test suite
app.post('/reset', async (req, res) => {
  try {
    await cleanUsers();
    await connectMongo();
    await cleanProducts();
    res.json({ success: true, message: 'All databases reset successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Orchestrator API running on port ${PORT}`);
});

module.exports = app;