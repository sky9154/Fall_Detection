from fastapi import APIRouter, Response, WebSocket
from functions import detection


router = APIRouter()

@router.websocket('/camera/{camera_id}')
async def camera (websocket: WebSocket, camera_id: str, draw: bool, response: Response):
  response.headers['x-content-type-options'] = 'nosniff'

  try:
    await websocket.accept()

    current_camera_id = None
    current_camera_draw = None

    if current_camera_id == None or current_camera_draw == None:
      current_camera_id = camera_id
      current_camera_draw = draw
      detection.state = False
      
      await detection.stream_video(websocket, camera_id, draw)
    else:
      if current_camera_id != camera_id or current_camera_draw != draw:
        await websocket.close()
        await websocket.accept()

        current_camera_id = camera_id
        current_camera_draw = draw
        detection.state = False
        
        await detection.stream_video(websocket, camera_id, draw)
      else:
        await detection.stream_video(websocket, camera_id, draw)
  except Exception as e:
    print(f'ERROR:    {e}')