const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');
const { seedUsers, cleanUsers } = require('../seeders/postgres/userSeeder');
const { connectMongo, seedProducts, cleanProducts } = require('../seeders/mongo/productSeeder');
const pool = require('../config/database');
require('dotenv').config();

const app = express();
app.use(express.json());

const path = require('path');

// Dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Service is running
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * @openapi
 * /seed/users:
 *   post:
 *     summary: Seed users in PostgreSQL
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Users seeded successfully
 */
app.post('/seed/users', async (req, res) => {
  try {
    const count = req.body.count || 10;
    const users = await seedUsers(count);
    res.json({ success: true, count: users.length, sample: users[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @openapi
 * /seed/users:
 *   delete:
 *     summary: Clean users table in PostgreSQL
 *     responses:
 *       200:
 *         description: Users table cleaned
 */
app.delete('/seed/users', async (req, res) => {
  try {
    await cleanUsers();
    res.json({ success: true, message: 'Users table cleaned' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @openapi
 * /seed/products:
 *   post:
 *     summary: Seed products in MongoDB
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Products seeded successfully
 */
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

/**
 * @openapi
 * /seed/products:
 *   delete:
 *     summary: Clean products collection in MongoDB
 *     responses:
 *       200:
 *         description: Products collection cleaned
 */
app.delete('/seed/products', async (req, res) => {
  try {
    await connectMongo();
    await cleanProducts();
    res.json({ success: true, message: 'Products collection cleaned' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @openapi
 * /reset:
 *   post:
 *     summary: Reset all databases
 *     responses:
 *       200:
 *         description: All databases reset successfully
 */
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
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/docs`);
});

module.exports = app;