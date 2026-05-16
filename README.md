# 🧪 Dynamic Test Data Orchestrator

> Service that dynamically seeds, cleans and prepares databases before each test suite — SQL/NoSQL support, HTTP injection, zero false positives.

![CI](https://github.com/VladimirRamirez07/dynamic-test-data-orchestrator/actions/workflows/ci.yml/badge.svg)
![Node](https://img.shields.io/badge/Node.js-18-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🚩 Problem

One of QA's biggest challenges is **data corruption and inconsistency between test runs**. When tests share state, a failing test can corrupt data for the next one — causing false positives and flaky test suites.

## ✅ Solution

This orchestrator provides a REST API that **cleans, generates and prepares databases dynamically** before each test suite using Data Seeding with Faker.js. Tests become 100% deterministic.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| PostgreSQL + pg | Relational data seeding |
| MongoDB + Mongoose | NoSQL data seeding |
| Faker.js | Realistic fake data generation |
| Docker + Docker Compose | Containerized databases |
| Vitest | API testing |
| GitHub Actions | CI/CD pipeline |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker Desktop

### 1. Clone and install
```bash
git clone https://github.com/VladimirRamirez07/dynamic-test-data-orchestrator.git
cd dynamic-test-data-orchestrator
npm install
```

### 2. Start databases
```bash
docker-compose up -d
```

### 3. Configure environment
```bash
cp .env.example .env
```

### 4. Start the API
```bash
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Service health check |
| POST | `/seed/users` | Seed users in PostgreSQL |
| DELETE | `/seed/users` | Clean users table |
| POST | `/seed/products` | Seed products in MongoDB |
| DELETE | `/seed/products` | Clean products collection |
| POST | `/reset` | Reset all databases |

### Example — Seed users before a test suite
```bash
curl -X POST http://localhost:3000/seed/users \
  -H "Content-Type: application/json" \
  -d '{"count": 20}'
```

### Example — Reset everything before running tests
```bash
curl -X POST http://localhost:3000/reset
```

---

## 🧪 How it works in a test suite

```javascript
// Before your test suite runs:
beforeAll(async () => {
  await fetch('http://localhost:3000/reset', { method: 'POST' });
  await fetch('http://localhost:3000/seed/users', {
    method: 'POST',
    body: JSON.stringify({ count: 10 })
  });
});

// Now every test runs with clean, predictable data ✅
```

---

## 📁 Project Structure
```
src/
├── api/
│   └── server.js          # Express REST API
├── config/
│   └── database.js        # PostgreSQL connection
├── seeders/
│   ├── postgres/
│   │   ├── userSeeder.js  # User seeding logic
│   │   └── run.js         # Standalone runner
│   └── mongo/
│       ├── productSeeder.js # Product seeding logic
│       └── run.js           # Standalone runner
tests/
└── api.test.js            # API integration tests
```
---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📄 License

MIT