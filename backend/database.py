# database.py
from sqlmodel import SQLModel, create_engine

DATABASE_URL = "sqlite:///./fatal_combatt.db"

engine = create_engine(DATABASE_URL, echo=True)


def init_db():
    SQLModel.metadata.create_all(engine)
