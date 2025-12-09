from ..state import active_rooms


async def handle_key_event(websocket, data):
    room_id = data["room_id"]
    user_id = data["user_id"]
    key = data["key"]
    pressed = data["pressed"]

    room = active_rooms.get(room_id)
    if not room:
        return

    # forward to opponent
    for uid, ws in room["players"].items():
        if uid != user_id:
            await ws.send_json(
                {"type": "opponent_key_event", "key": key, "pressed": pressed}
            )
