# 🧪 Dynamic Test Data Orchestrator

> Service that dynamically seeds, cleans and prepares databases before each test suite — SQL/NoSQL support, HTTP injection, zero false positives.

![CI](https://github.com/VladimirRamirez07/dynamic-test-data-orchestrator/actions/workflows/ci.yml/badge.svg)
![Node](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![Faker](https://img.shields.io/badge/Faker.js-latest-FF6B6B?logo=javascript&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-UI-85EA2D?logo=swagger&logoColor=black)
![Vitest](https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🖥️ Dashboard Preview

![Dashboard](./docs/dashboard-preview.png)

---

## 🚩 Problem

One of QA's biggest challenges is **data corruption and inconsistency between test runs**. When tests share state, a failing test can corrupt data for the next one — causing false positives and flaky test suites.

## ✅ Solution

This orchestrator provides a REST API that **cleans, generates and prepares databases dynamically** before each test suite using Data Seeding with Faker.js. Tests become 100% deterministic

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| Python 3.11 | Alternative seeders |
| PostgreSQL + pg | Relational data seeding |
| MongoDB + Mongoose | NoSQL data seeding |
| Faker.js + Faker (Python) | Realistic fake data generation |
| Docker + Docker Compose | Containerized databases |
| Swagger UI | Interactive API documentation |
| Vitest | API testing |
| GitHub Actions | CI/CD pipeline (Node + Python jobs) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
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
node src/api/server.js
```

### 5. Open the dashboard

http://localhost:3000

### 6. Open Swagger docs

http://localhost:3000/docs

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

## 🐍 Python Seeders

```bash
cd python
pip install -r requirements.txt
python run_all.py
```

---

## 🧪 How it works in a test suite

```javascript
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
│   ├── server.js            # Express REST API
│   └── dashboard.html       # Visual dashboard UI
├── config/
│   ├── database.js          # PostgreSQL connection
│   └── swagger.js           # Swagger configuration
├── seeders/
│   ├── postgres/
│   │   ├── userSeeder.js    # User seeding logic
│   │   └── run.js           # Standalone runner
│   └── mongo/
│       ├── productSeeder.js # Product seeding logic
│       └── run.js           # Standalone runner
python/
├── config/
│   └── settings.py          # Python environment config
├── seeders/
│   ├── user_seeder.py       # PostgreSQL seeder (Python)
│   └── product_seeder.py    # MongoDB seeder (Python)
├── run_all.py               # Run all Python seeders
└── requirements.txt         # Python dependencies
tests/
└── api.test.js              # Vitest unit tests
docs/
└── dashboard-preview.png    # Dashboard screenshot
.github/
└── workflows/
└── ci.yml               # GitHub Actions (Node + Python)
```
---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📄 License

MIT

