from fastapi import WebSocket, WebSocketDisconnect
import json

from .event_handlers.join_lobby import handle_join_lobby
from .state import active_users
from .utils import broadcast_except


async def ws_endpoint(websocket: WebSocket):
    await websocket.accept()
    current_user_id = None

    try:
        while True:
            raw = await websocket.receive_text()
            data = json.loads(raw)
            event = data.get("type")

            if event == "join_lobby":
                current_user_id = await handle_join_lobby(websocket, data)

    except WebSocketDisconnect:
        if current_user_id in active_users:
            leaving_user = active_users[current_user_id]["user"]
            del active_users[current_user_id]

            await broadcast_except(
                {"type": "lobby_user_left", "user": leaving_user}, exclude_ws=websocket
            )
