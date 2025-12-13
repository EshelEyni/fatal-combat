# auth.py
from fastapi import APIRouter, Depends, HTTPException, Response, Cookie
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
    set_auth_cookie,
)


class UserParams(BaseModel):
    username: str
    password: str


router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup")
def register(
    data: UserParams, response: Response, session: Session = Depends(get_session)
):
    if len(data.password) < 4:
        return {
            "message": "Password must be at least 4 characters long",
            "status": "fail",
            "data": {},
        }

    existing = session.exec(select(User).where(User.username == data.username)).first()
    if existing:
        return {"message": "Username already taken", "status": "fail", "data": {}}

    user = User(username=data.username, password=hash_password(data.password))

    session.add(user)
    session.commit()
    session.refresh(user)

    token = create_access_token({"sub": str(user.id)})

    set_auth_cookie(response, token)

    return {"message": "User created", "status": "success", "data": user}


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/login")
def login(
    data: UserParams, response: Response, session: Session = Depends(get_session)
):
    user = session.exec(select(User).where(User.username == data.username)).first()

    if not user or not verify_password(data.password, user.password):
        return {"message": "Invalid credentials", "status": "fail", "data": {}}

    token = create_access_token({"sub": str(user.id)})

    set_auth_cookie(response, token)

    return {"message": "Logged in", "status": "success", "data": user}


@router.get("/login-with-token")
def get_current_user(
    fatalCombatJWT: str = Cookie(None), session: Session = Depends(get_session)
):
    if fatalCombatJWT is None:
        return {"message": "Missing auth cookie", "status": "fail", "data": {}}

    try:
        payload = jwt.decode(fatalCombatJWT, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            return {"message": "Invalid token", "status": "fail", "data": {}}
    except JWTError:
        return {"message": "Invalid token", "status": "fail", "data": {}}

    user = session.get(User, user_id)
    if not user:
        return {"message": "User not found", "status": "fail", "data": {}}

    return {"message": "Logged in With Token", "status": "success", "data": user}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="fatalCombatJWT", path="/")

    return {
        "message": "logout",
        "status": "success",
        "data": {"msg": "Logged out successfully"},
    }
