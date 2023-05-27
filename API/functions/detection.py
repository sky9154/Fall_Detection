from fastapi import WebSocket
from mediapipe import solutions
from keras.models import load_model
import numpy  as np
import requests
import cv2


mp_drawing = solutions.drawing_utils
mp_drawing_styles = solutions.drawing_styles
mp_pose = solutions.pose

model = None
pose = None
state = False

async def extract_keypoints (results):
  '''
  提取關鍵點
  '''

  landmarks = results.landmark

  indices = [0] + list(range(11, 17)) + list(range(23, 29))

  pose_x = [landmarks[i].x * 1280 for i in indices]
  pose_y = [landmarks[i].y * 720 for i in indices]

  return np.concatenate([pose_x, pose_y])


async def process_image (frame, pose, draw: bool):
  '''
  調整影像大小，並進行姿勢估計
  '''
  
  height, width = frame.shape[:2]
  aspect_ratio = width / height

  new_width = int(height * 16 / 9)
  new_aspect_ratio = 16 / 9

  if abs(aspect_ratio - new_aspect_ratio) > 0.001:
    pad = int((new_width - width) / 2)

    image = np.zeros((height, new_width, 3), np.uint8)
    image[:, pad : pad + width] = frame
  else:
    image = frame

  resized = cv2.resize(image, (1280, 720), interpolation = cv2.INTER_AREA)
  resized = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
  results = pose.process(resized)

  if draw:
    mp_drawing.draw_landmarks(
      image,
      results.pose_landmarks,
      mp_pose.POSE_CONNECTIONS,
      landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style()
    )

  return image, results


async def stream_video (websocket: WebSocket, camera_id: str, draw: bool):
  '''
  傳輸影像串流
  '''

  global model, pose, state, line_token

  if model is None:
    model = load_model('model/LSTM.h5')

  if pose is None:
    pose = mp_pose.Pose(
      min_detection_confidence=0.7,
      min_tracking_confidence=0.5
    )

  is_esp32 = camera_id == 'esp32'

  cap = None

  match camera_id:
    case 'test':
      cap = cv2.VideoCapture('video/fall.mp4')
    case _:
      cap = cv2.VideoCapture(int(camera_id))

  number = 0
  state = False

  while True:
    if is_esp32:
      response = requests.get(cap, stream=True)

      if response.status_code == 200:
        frame_arr = np.array(bytearray(response.content), dtype=np.uint8)

        frame = cv2.imdecode(frame_arr, -1)
    else: 
      success, frame = cap.read()

      if not success:
        break

    frame, results = await process_image(frame, pose, draw)

    pose_landmarks = results.pose_landmarks
    safety = 0
    warning = 0
    fall = 0

    if pose_landmarks:
      keypoints = await extract_keypoints(pose_landmarks)
      keypoints = np.array(keypoints)
      keypoints = np.expand_dims(keypoints, axis=0)

      prediction = model.predict(keypoints, verbose=0)

      safety = round(prediction[0][0] * 100, 1)
      warning = round(prediction[0][1] * 100, 1)
      fall = round(prediction[0][2] * 100, 1)

    if (safety < 90) != state and not state:
      number = 0
      state = True

      cv2.imwrite('temp/fall.png', frame)

    if safety > 90:
      number += 1
  
    if number > 10:
      number = 0
      state = False

    success, buffer = cv2.imencode('.jpg', frame)
    frame = buffer.tobytes()

    await websocket.send_bytes(frame)
    await websocket.send_json({
      'predict': {
        'safety': safety,
        'warning': warning,
        'fall': fall
      },
      'state': state
    })