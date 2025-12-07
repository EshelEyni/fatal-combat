import json
from fastapi import WebSocket

from ..state import active_users


async def broadcast_except(message, exclude_ws: WebSocket):

    print("ACTIVE USERS:", list(active_users.keys()))

    data = json.dumps(message)
    for info in active_users.values():
        ws = info["ws"]
        if ws != exclude_ws:
            await ws.send_text(data)
