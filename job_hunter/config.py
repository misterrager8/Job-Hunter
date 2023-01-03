import os

import dotenv

dotenv.load_dotenv()

PORT = os.getenv("port") or "5000"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = os.getenv("db")
