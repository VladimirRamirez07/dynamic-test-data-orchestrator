import { describe, it, expect, vi } from 'vitest';
import { seedUsers, cleanUsers } from '../src/seeders/postgres/userSeeder.js';
import { seedProducts, cleanProducts } from '../src/seeders/mongo/productSeeder.js';

// Mock de las conexiones a BD para no necesitar DB real en CI
vi.mock('../src/config/database.js', () => ({
  default: {
    query: vi.fn().mockResolvedValue({ rows: [{ id: 1, name: 'Test User', email: 'test@test.com', role: 'admin' }] }),
    end: vi.fn()
  }
}));

vi.mock('mongoose', () => ({
  default: {
    connect: vi.fn().mockResolvedValue(true),
    disconnect: vi.fn().mockResolvedValue(true),
    Schema: vi.fn().mockImplementation(() => ({})),
    model: vi.fn().mockReturnValue({
      deleteMany: vi.fn().mockResolvedValue(true),
      insertMany: vi.fn().mockResolvedValue([
        { name: 'Product A', price: 10.99, category: 'Electronics', stock: 100, isActive: true }
      ])
    })
  }
}));

describe('PostgreSQL Seeder', () => {
  it('seedUsers returns an array', async () => {
    const users = await seedUsers(5);
    expect(Array.isArray(users)).toBe(true);
  });

  it('cleanUsers executes without error', async () => {
    await expect(cleanUsers()).resolves.not.toThrow();
  });
});

describe('MongoDB Seeder', () => {
  it('seedProducts returns an array', async () => {
    const products = await seedProducts(5);
    expect(Array.isArray(products)).toBe(true);
  });

  it('cleanProducts executes without error', async () => {
    await expect(cleanProducts()).resolves.not.toThrow();
  });
});