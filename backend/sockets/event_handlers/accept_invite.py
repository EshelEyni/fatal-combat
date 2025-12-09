from uuid import uuid4
from ..state import active_users, active_rooms
from ..utils.send_to import send_to


async def accept_invite(websocket, data):
    inviter_id = data["fromUserId"]
    accepter_id = data["toUserId"]

    inviter_ws = active_users[inviter_id]["ws"]
    accepter_ws = active_users[accepter_id]["ws"]

    room_id = f"room-{uuid4().hex[:8]}"

    # Create room
    active_rooms[room_id] = {
        "players": {inviter_id: inviter_ws, accepter_id: accepter_ws}
    }

    # Inform the players they entered the room
    await send_to(
        inviter_ws,
        {
            "type": "room_joined",
            "room_id": room_id,
            "you_are": "player1",
            "opponent": active_users[accepter_id]["user"],
        },
    )

    await send_to(
        accepter_ws,
        {
            "type": "room_joined",
            "room_id": room_id,
            "you_are": "player2",
            "opponent": active_users[inviter_id]["user"],
        },
    )

    print(f"Created room {room_id} with players {inviter_id} and {accepter_id}")
