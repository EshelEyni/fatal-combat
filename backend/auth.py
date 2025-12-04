# auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from models import User
from deps import get_session

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup")
def register(username: str, password: str, session: Session = Depends(get_session)):
    # check if user exists
    existing = session.exec(select(User).where(User.username == username)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")

    user = User(username=username, password=password)
    session.add(user)
    session.commit()
    session.refresh(user)

    return {"message": "User created", "user_id": user.id}


@router.post("/login")
def login(username: str, password: str, session: Session = Depends(get_session)):
    user = session.exec(
        select(User).where(User.username == username, User.password == password)
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Logged in", "user_id": user.id}
