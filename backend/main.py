from fastapi import FastAPI, WebSocket

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Server OK"}


@app.websocket("/ws/game")
async def game_socket(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        # echo back for now
        await websocket.send_text(f"You said: {data}")
