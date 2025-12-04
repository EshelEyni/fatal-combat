# auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from models import User
from deps import get_session
from pydantic import BaseModel
from password_utils import hash_password, verify_password

from auth_utils import create_access_token
from passlib.context import CryptContext
from auth_deps import get_current_user


class UserParams(BaseModel):
    username: str
    password: str


router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup")
def register(data: UserParams, session: Session = Depends(get_session)):
    if len(data.password) < 4:
        raise HTTPException(
            status_code=400, detail="Password must be at least 4 characters long"
        )

    existing = session.exec(select(User).where(User.username == data.username)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")

    user = User(
        username=data.username, password=hash_password(data.password)  # ← HASH HERE
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return {"message": "User created", "user_id": user.id}


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/login")
def login(data: UserParams, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.username == data.username)).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})

    return {"message": "Logged in", "access_token": token, "token_type": "bearer"}


@router.get("/login-with-token")
def get_me(current_user=Depends(get_current_user)):
    return {"username": current_user.username}
