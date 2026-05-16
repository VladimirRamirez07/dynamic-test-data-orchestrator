const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');
}

async function seedProducts(count = 10) {
  await Product.deleteMany({});

  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      stock: faker.number.int({ min: 0, max: 500 }),
      isActive: faker.datatype.boolean(),
    });
  }

  const result = await Product.insertMany(products);
  console.log(`✅ ${count} products seeded in MongoDB`);
  return result;
}

async function cleanProducts() {
  await Product.deleteMany({});
  console.log('🧹 Products collection cleaned');
}

module.exports = { connectMongo, seedProducts, cleanProducts };