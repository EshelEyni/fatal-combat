from fastapi import WebSocket
from ..state import (
    active_users,
)
from ..utils.broadcast_except import broadcast_except
import json


async def invite(websocket: WebSocket, data):
    from_user_id = data.get("fromUserId")
    to_user_id = data.get("toUserId")

    if not to_user_id:
        print("Error: 'toUserId' missing from data.")
        return

    curr_active_user = active_users.get(str(to_user_id))
    to_user_websocket = curr_active_user["ws"]

    if not to_user_websocket:
        print(f"Recipient user ID {to_user_id} not found in active_users.")

        await websocket.send_json(
            {"type": "error", "message": f"User {to_user_id} is currently offline."}
        )
        return

    invite_message = {
        "type": "game_invite",
        "from_user_id": from_user_id,
        "message": "You have been invited to a game!",
    }

    try:
        # **Use send_json for Python dictionaries**
        await to_user_websocket.send_json(invite_message)
        print(f"Sent invite from {from_user_id} to {to_user_id}.")

    except Exception as e:
        # Handle send errors (e.g., connection was suddenly closed)
        print(f"Error sending message to {to_user_id}: {e}")
        # Clean up the closed connection from active_users
        if to_user_id in active_users:
            del active_users[to_user_id]
