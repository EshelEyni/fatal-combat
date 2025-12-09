from uuid import uuid4
from ..state import active_users, active_rooms
from ..utils.send_to import send_to


async def accept_invite(websocket, data):
    inviter_id = data["fromUserId"]
    accepter_id = data["toUserId"]

    inviter = active_users.get(str(inviter_id))
    accepter = active_users.get(str(accepter_id))
    inviter_ws = inviter["ws"]
    accepter_ws = accepter["ws"]

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
            "opponent": accepter["user"]["username"],
        },
    )

    await send_to(
        accepter_ws,
        {
            "type": "room_joined",
            "room_id": room_id,
            "you_are": "player2",
            "opponent": inviter["user"]["username"],
        },
    )

    print(f"Created room {room_id} with players {inviter_id} and {accepter_id}")
