import os
from dotenv import load_dotenv

load_dotenv()

PG_CONFIG = {
    "host": os.getenv("PG_HOST", "localhost"),
    "port": os.getenv("PG_PORT", "5432"),
    "user": os.getenv("PG_USER", "testuser"),
    "password": os.getenv("PG_PASSWORD", "testpass"),
    "database": os.getenv("PG_DATABASE", "testdb"),
}

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/testdb")