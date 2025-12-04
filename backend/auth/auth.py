# auth.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError

from models.user import User
from database.database import get_session
from auth.auth_utils import (
    create_access_token,
    SECRET_KEY,
    ALGORITHM,
    hash_password,
    verify_password,
)

# from  auth.auth_deps import get_current_user


class UserParams(BaseModel):
    username: str
    password: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
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
def get_current_user(
    token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user
