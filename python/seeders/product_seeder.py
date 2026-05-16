from pymongo import MongoClient
from faker import Faker
import random
from config.settings import MONGO_URI

fake = Faker()

def get_collection():
    client = MongoClient(MONGO_URI)
    db = client["testdb"]
    return client, db["products"]

def seed_products(count=10):
    client, collection = get_collection()
    collection.delete_many({})

    products = []
    for _ in range(count):
        products.append({
            "name": fake.catch_phrase(),
            "price": round(random.uniform(5.0, 500.0), 2),
            "category": fake.word().capitalize(),
            "stock": random.randint(0, 500),
            "isActive": random.choice([True, False])
        })

    result = collection.insert_many(products)
    client.close()

    print(f"✅ {count} products seeded in MongoDB (Python)")
    return result.inserted_ids

def clean_products():
    client, collection = get_collection()
    collection.delete_many({})
    client.close()
    print("🧹 Products collection cleaned (Python)")

if __name__ == "__main__":
    clean_products()
    ids = seed_products(15)
    print(f"Sample product id: {ids[0]}")