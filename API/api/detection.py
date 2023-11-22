from fastapi import APIRouter, Response, WebSocket
from functions import detection


router = APIRouter()

@router.websocket('/{camera_id}')
async def stream (websocket: WebSocket, camera_id: str, draw: bool, response: Response):
  try:
    await websocket.accept()

    current_camera_id = None
    current_camera_draw = None

    if current_camera_id == None or current_camera_draw == None:
      current_camera_id = camera_id
      current_camera_draw = draw
      detection.state = False
      
      await detection.stream(websocket, camera_id, draw)
    else:
      if current_camera_id != camera_id or current_camera_draw != draw:
        await websocket.close()
        await websocket.accept()

        current_camera_id = camera_id
        current_camera_draw = draw
        detection.state = False
        
        await detection.stream(websocket, camera_id, draw)
      else:
        await detection.stream(websocket, camera_id, draw)
  except Exception as e:
    print(f'ERROR:    {e}')