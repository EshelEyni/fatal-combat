from fastapi import WebSocket


async def send_to(ws: WebSocket, message: dict):
    try:
        await ws.send_json(message)
    except Exception as e:
        print("send_to error:", e)
