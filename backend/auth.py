# auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from models import User
from deps import get_session
from pydantic import BaseModel


class UserParams(BaseModel):
    username: str
    password: str


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup")
def register(data: UserParams, session: Session = Depends(get_session)):
    # password length guard
    if len(data.password) < 4:
        raise HTTPException(
            status_code=400, detail="Password must be at least 4 characters long"
        )

    # check if user exists
    existing = session.exec(select(User).where(User.username == data.username)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")

    user = User(username=data.username, password=data.password)
    session.add(user)
    session.commit()
    session.refresh(user)

    return {"message": "User created", "user_id": user.id}


@router.post("/login")
def login(data: UserParams, session: Session = Depends(get_session)):
    user = session.exec(
        select(User).where(
            User.username == data.username, User.password == data.password
        )
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Logged in", "user_id": user.id}
