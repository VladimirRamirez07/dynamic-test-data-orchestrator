import sys
import os

sys.path.append(os.path.dirname(__file__))

from seeders.user_seeder import seed_users, clean_users
from seeders.product_seeder import seed_products, clean_products

def reset_all():
    print("⚡ Resetting all databases (Python)...")
    clean_users()
    clean_products()
    print("✅ All databases reset successfully")

def seed_all(count=10):
    print(f"🌱 Seeding all databases with {count} records each...")
    seed_users(count)
    seed_products(count)
    print("✅ All databases seeded successfully")

if __name__ == "__main__":
    reset_all()
    seed_all(10)