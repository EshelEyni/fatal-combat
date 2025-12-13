from ..state import active_rooms
from ..utils.send_to import send_to


async def leave_room(websocket, data):
    user_id = data["user_id"]

    room_id = None
    for rid, room in active_rooms.items():
        if user_id in room["players"]:
            room_id = rid
            break

    if room_id is None:
        await send_to(
            websocket, {"type": "leave_room_failed", "reason": "user_not_in_room"}
        )
        return

    room = active_rooms[room_id]
    players = room["players"]

    opponent_id = next((pid for pid in players if pid != user_id), None)
    opponent_ws = players.get(opponent_id)

    del players[user_id]

    await send_to(websocket, {"type": "left_room_success", "room_id": room_id})

    if opponent_ws:
        await send_to(
            opponent_ws,
            {"type": "opponent_left_room", "room_id": room_id, "user_id": user_id},
        )

    if len(players) == 0:
        del active_rooms[room_id]
        print(f"Deleted empty room {room_id}")

    print(f"User {user_id} left room {room_id}")
