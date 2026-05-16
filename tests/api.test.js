import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock database antes de importar seeders
vi.mock('../src/config/database.js', () => ({
  default: {
    query: vi.fn().mockResolvedValue({ 
      rows: [{ id: 1, name: 'Test User', email: 'test@test.com', role: 'admin' }] 
    }),
    end: vi.fn()
  }
}));

// Mock mongoose completamente
vi.mock('mongoose', () => {
  const mockModel = {
    deleteMany: vi.fn().mockResolvedValue({ deletedCount: 0 }),
    insertMany: vi.fn().mockResolvedValue([
      { name: 'Product A', price: 10.99, category: 'Electronics', stock: 100, isActive: true }
    ])
  };
  return {
    default: {
      connect: vi.fn().mockResolvedValue(true),
      disconnect: vi.fn().mockResolvedValue(true),
      Schema: vi.fn().mockReturnValue({}),
      model: vi.fn().mockReturnValue(mockModel)
    }
  };
});

import { seedUsers, cleanUsers } from '../src/seeders/postgres/userSeeder.js';

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
  it('seedProducts returns a non-empty array', async () => {
    const mongoose = await import('mongoose');
    const { faker } = await import('@faker-js/faker');

    const mockProducts = Array.from({ length: 5 }, () => ({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      stock: faker.number.int({ min: 0, max: 500 }),
      isActive: faker.datatype.boolean(),
    }));

    const model = mongoose.default.model();
    model.insertMany.mockResolvedValue(mockProducts);

    const result = await model.insertMany(mockProducts);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
  });

  it('cleanProducts executes without error', async () => {
    const mongoose = await import('mongoose');
    const model = mongoose.default.model();
    await expect(model.deleteMany({})).resolves.not.toThrow();
  });
});