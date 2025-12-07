from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from database.database import init_db
from auth.auth import router as auth_router
from fastapi.websockets import WebSocketDisconnect
from uuid import uuid4
from typing import Dict, Any
import json


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],  # allow all methods
    allow_headers=["*"],  # allow all headers
)

init_db()
app.include_router(auth_router)


@app.get("/api/")
def root():
    return {"message": "Server OK"}


connected_users = set()


async def broadcast(message: Dict[str, Any]):
    data = json.dumps(message)
    for user in connected_users:
        await user.send_text(data)


@app.websocket("/ws")
async def ws_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("socket triggered")

    try:
        while True:  # <-- YOU NEED THIS
            msg = await websocket.receive_text()
            print("received raw:", msg)

            try:
                data = json.loads(msg)
                print("parsed json:", data)
            except Exception as json_err:
                print("JSON parse error:", json_err)

    except WebSocketDisconnect:
        print("client disconnected")
    except Exception as recv_err:
        print("Receive error:", recv_err)
