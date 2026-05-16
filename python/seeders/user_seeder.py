import psycopg2
from faker import Faker
import random
from config.settings import PG_CONFIG

fake = Faker()

def get_connection():
    return psycopg2.connect(**PG_CONFIG)

def create_users_table(cursor):
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            role VARCHAR(50),
            created_at TIMESTAMP DEFAULT NOW()
        )
    """)

def seed_users(count=10):
    conn = get_connection()
    cursor = conn.cursor()

    create_users_table(cursor)
    cursor.execute("DELETE FROM users")

    users = []
    roles = ["admin", "editor", "viewer"]

    for _ in range(count):
        name = fake.name()
        email = fake.unique.email()
        role = random.choice(roles)

        cursor.execute(
            "INSERT INTO users (name, email, role) VALUES (%s, %s, %s) RETURNING *",
            (name, email, role)
        )
        users.append(cursor.fetchone())

    conn.commit()
    cursor.close()
    conn.close()

    print(f"✅ {count} users seeded in PostgreSQL (Python)")
    return users

def clean_users():
    conn = get_connection()
    cursor = conn.cursor()
    create_users_table(cursor)  # Crea la tabla si no existe
    cursor.execute("DELETE FROM users")
    conn.commit()
    cursor.close()
    conn.close()
    print("🧹 Users table cleaned (Python)")

if __name__ == "__main__":
    clean_users()
    users = seed_users(15)
    print(f"Sample user: {users[0]}")