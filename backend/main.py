from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from database.database import init_db
from auth.auth import router as auth_router
from sockets.router import ws_endpoint

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost"],
    allow_credentials=True,
    allow_methods=["*"],  # allow all methods
    allow_headers=["*"],  # allow all headers
)

init_db()
app.include_router(auth_router)


@app.get("/api/")
def root():
    return {"message": "Server OK"}


@app.websocket("/ws")
async def websocket_router(websocket: WebSocket):
    return await ws_endpoint(websocket)
