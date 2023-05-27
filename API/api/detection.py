from fastapi import APIRouter, Response, WebSocket
from dotenv import load_dotenv
from functions import detection


load_dotenv()

router = APIRouter()

@router.websocket('/camera/{camera_id}')
async def camera (websocket: WebSocket, camera_id: str, draw: bool, response: Response):
  response.headers['x-content-type-options'] = 'nosniff'

  try:
    await websocket.accept()

    while True:
      if camera_id != websocket.scope['path_params']['camera_id']:
        await websocket.close()

        new_websocket = WebSocket(websocket.application, websocket.scope)

        await new_websocket.prepare()
        await detection.stream_video(new_websocket, camera_id, draw)

        break
      else:
        await detection.stream_video(websocket, camera_id, draw)

    return { 'messages': 'ok' }
  except Exception as e:
    if e.code == 1005:
      pass
    else:
      print(f'[Error]\n{e}')
