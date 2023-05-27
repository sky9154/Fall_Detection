import numpy  as np
import cv2
from mediapipe import solutions
from keras.models import load_model
from PIL import Image, ImageDraw, ImageFont


model = load_model('model/LSTM.h5')
video_path = 'video/fall.mp4'

cap = cv2.VideoCapture(video_path)

mp_drawing = solutions.drawing_utils
mp_drawing_styles = solutions.drawing_styles
mp_pose = solutions.pose

def extract_keypoints (results):
  landmarks = results.pose_landmarks.landmark

  keypoints = [landmarks[i] for i in [0] + list(range(11, 17)) + list(range(23, 29))]

  pose_x = [keypoint.x * 1280 for keypoint in keypoints]
  pose_y = [keypoint.y * 720 for keypoint in keypoints]

  return np.concatenate([pose_x, pose_y])


def put_text (image, text, position, font_color=(0, 0, 0), font_size=30):
  if (isinstance(image, np.ndarray)):
    image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

  draw = ImageDraw.Draw(image)
  
  fontStyle = ImageFont.truetype('font/NotoSansTC-Medium.otf', font_size, encoding='utf-8')

  draw.text(position, text, font_color, font=fontStyle)

  return cv2.cvtColor(np.asarray(image), cv2.COLOR_RGB2BGR)


with mp_pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.5) as pose:
  while True:
    success, frame = cap.read()

    results = pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

    if results.pose_landmarks:
      keypoints = extract_keypoints(results)
    else:
      continue

    keypoints = np.array(keypoints)
    keypoints = np.expand_dims(keypoints, axis=0)

    prediction = model.predict(keypoints, verbose=0)

    safety = round(prediction[0][0] * 100, 1)
    warning = round(prediction[0][1] * 100, 1)
    fall = round(prediction[0][2] * 100, 1)

    mp_drawing.draw_landmarks(
      frame,
      results.pose_landmarks,
      mp_pose.POSE_CONNECTIONS,
      landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style()
    )

    frame = put_text(frame, f'安全: {str(safety).zfill(2)}%', (10, 00), (255, 255, 255), 30)
    frame = put_text(frame, f'警告: {str(warning).zfill(2)}%', (10, 40), (255, 255, 255), 30)
    frame = put_text(frame, f'危險: {str(fall).zfill(2)}%', (10, 80), (255, 255, 255), 30)

    if warning + fall > 50: 
      frame = put_text(frame, '警告', (10, 120), (255, 0, 0), 30)

    cv2.imshow('MediaPipe Pose', frame)

    if cv2.waitKey(5) == ord('q'):
      break

  cap.release()
