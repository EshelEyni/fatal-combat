# database.py
from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./database/fatal_combatt.db"

engine = create_engine(DATABASE_URL, echo=True)

# deps.py


def get_session():
    with Session(engine) as session:
        yield session


def init_db():
    SQLModel.metadata.create_all(engine)
