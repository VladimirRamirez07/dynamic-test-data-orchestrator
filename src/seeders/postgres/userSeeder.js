const { faker } = require('@faker-js/faker');
const pool = require('../../config/database');

async function createUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      role VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

async function seedUsers(count = 10) {
  await createUsersTable();
  await pool.query('DELETE FROM users');

  const users = [];
  for (let i = 0; i < count; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const role = faker.helpers.arrayElement(['admin', 'editor', 'viewer']);

    const result = await pool.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
      [name, email, role]
    );
    users.push(result.rows[0]);
  }

  console.log(`✅ ${count} users seeded in PostgreSQL`);
  return users;
}

async function cleanUsers() {
  await pool.query('DELETE FROM users');
  console.log('🧹 Users table cleaned');
}

module.exports = { seedUsers, cleanUsers };