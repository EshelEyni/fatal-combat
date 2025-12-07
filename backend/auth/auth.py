# auth.py
from fastapi import APIRouter, Depends, HTTPException, Response, Cookie
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


class UserParams(BaseModel):
    username: str
    password: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup")
def register(
    data: UserParams, response: Response, session: Session = Depends(get_session)
):
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

    token = create_access_token({"sub": str(user.id)})

    response.set_cookie(
        key="fatalCombatJWT",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60,
        path="/",
    )
    return {"message": "User created", "status": "success", "data": user}


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/login")
def login(
    data: UserParams, response: Response, session: Session = Depends(get_session)
):
    user = session.exec(select(User).where(User.username == data.username)).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})

    response.set_cookie(
        key="fatalCombatJWT",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60,
        path="/",
    )

    return {"message": "Logged in", "status": "success", "data": user}


@router.get("/login-with-token")
def get_current_user(
    fatalCombatJWT: str = Cookie(None), session: Session = Depends(get_session)
):
    if fatalCombatJWT is None:
        raise HTTPException(401, "Missing auth cookie")

    try:
        payload = jwt.decode(fatalCombatJWT, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(401, "Invalid token")
    except JWTError:
        raise HTTPException(401, "Invalid token")

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(401, "User not found")

    return {"message": "Logged in With Token", "status": "success", "data": user}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="fatalCombatJWT", path="/")

    return {
        "message": "logout",
        "status": "success",
        "data": {"msg": "Logged out successfully"},
    }
