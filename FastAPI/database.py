from databases import Database
from sqlalchemy import create_engine, MetaData
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

# Load database URL from .env file
DATABASE_URL = os.getenv("DATABASE_URL")

# Initialize database connection
database = Database(DATABASE_URL)
engine = create_engine(DATABASE_URL)
metadata = MetaData()
