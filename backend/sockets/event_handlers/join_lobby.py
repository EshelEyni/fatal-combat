from fastapi import WebSocket
from ..state import active_users
from ..utils.broadcast_except import broadcast_except

async def handle_join_lobby(websocket: WebSocket, data):
    user = data["user"]
    user_id = str(user["id"])

    active_users[user_id] = {
        "ws": websocket,
        "user": user
    }

    other_users = [
        info["user"]
        for uid, info in active_users.items()
        if uid != user_id
    ]

    await websocket.send_json({
        "type": "lobby_users",
        "users": other_users
    })

    await broadcast_except({
        "type": "user_joined_lobby",
        "user": user
    }, exclude_ws=websocket)

    return user_id
