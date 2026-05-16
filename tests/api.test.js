import { describe, it, expect } from 'vitest';

describe('Orchestrator API', () => {
  const BASE_URL = 'http://localhost:3000';

  it('should return health status', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.status).toBe('ok');
  });

  it('should seed users in PostgreSQL', async () => {
    const res = await fetch(`${BASE_URL}/seed/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: 5 })
    });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.count).toBe(5);
  });

  it('should clean users', async () => {
    const res = await fetch(`${BASE_URL}/seed/users`, { method: 'DELETE' });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('should reset all databases', async () => {
    const res = await fetch(`${BASE_URL}/reset`, { method: 'POST' });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });
});