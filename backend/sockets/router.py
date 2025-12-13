from fastapi import WebSocket, WebSocketDisconnect
import json

from .event_handlers.join_lobby import handle_join_lobby
from .event_handlers.invite import invite
from .event_handlers.accept_invite import accept_invite
from .event_handlers.key_event import handle_key_event
from .event_handlers.leave_room import leave_room
from .state import active_users, active_rooms
from .utils import broadcast_except


async def ws_endpoint(websocket: WebSocket):
    await websocket.accept()
    current_user_id = None

    try:
        while True:
            raw = await websocket.receive_text()
            data = json.loads(raw)
            print("data", data)
            event = data.get("type")

            if event == "join_lobby":
                current_user_id = await handle_join_lobby(websocket, data)
            if event == "send_game_invite":
                await invite(websocket, data)
            if event == "accept_game_invite":
                await accept_invite(websocket, data)
            if event == "key_event":
                await handle_key_event(websocket, data)
            if event == "leave_room":
                await leave_room(websocket, data)
    except WebSocketDisconnect:
        if current_user_id in active_users:
            leaving_user = active_users[current_user_id]["user"]
            del active_users[current_user_id]

            await broadcast_except(
                {"type": "user_left_lobby", "user": leaving_user}, exclude_ws=websocket
            )

        for room_id, room in list(active_rooms.items()):
            if current_user_id in room["players"]:
                del room["players"][current_user_id]

                # notify opponent
                for ws in room["players"].values():
                    await ws.send_json({"type": "opponent_disconnected"})

                # delete empty room
                if len(room["players"]) == 0:
                    del active_rooms[room_id]
