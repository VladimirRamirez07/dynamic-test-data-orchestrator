const { seedUsers, cleanUsers } = require('./userSeeder');
const pool = require('../../config/database');

async function main() {
  try {
    console.log('🌱 Starting PostgreSQL seeder...');
    await cleanUsers();
    const users = await seedUsers(15);
    console.log('Sample user:', users[0]);
  } catch (err) {
    console.error('❌ Seeder error:', err.message);
  } finally {
    await pool.end();
  }
}

main();