import os
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import jwt
from dotenv import load_dotenv
from fastapi import Response

load_dotenv()  # loads .env file

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", 60))

pwd_context = CryptContext(
    schemes=[os.getenv("PASSWORD_HASH_SCHEME", "bcrypt_sha256")],
    deprecated=os.getenv("PASSWORD_HASH_DEPRECATED", "auto"),
)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key="fatalCombatJWT",
        value=token,
        httponly=True,
        secure=False,  # change to True in production with HTTPS
        samesite="lax",
        max_age=60 * 60,
        path="/",
    )
