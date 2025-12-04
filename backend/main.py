from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from database.database import init_db
from auth.auth import router as auth_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],  # allow all methods
    allow_headers=["*"],  # allow all headers
)

init_db()
# app.include_router(auth_router)


@app.get("/api/")
def root():
    return {"message": "Server OK"}


@app.websocket("/api/ws/game")
async def game_socket(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        # echo back for now
        await websocket.send_text(f"You said: {data}")
