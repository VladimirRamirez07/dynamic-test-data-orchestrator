const { connectMongo, seedProducts, cleanProducts } = require('./productSeeder');
const mongoose = require('mongoose');

async function main() {
  try {
    console.log('🌱 Starting MongoDB seeder...');
    await connectMongo();
    await cleanProducts();
    const products = await seedProducts(15);
    console.log('Sample product:', products[0]);
  } catch (err) {
    console.error('❌ Seeder error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

main();