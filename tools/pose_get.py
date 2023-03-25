import os
import sys
import cv2
import numpy as np
from mediapipe import solutions
from csv import writer, DictReader


mp_drawing = solutions.drawing_utils
mp_drawing_styles = solutions.drawing_styles
mp_pose = solutions.pose

DATASET = input('DATASET: ')
IMAGE_FILES = os.listdir(DATASET)
WIDTH = 640
HEIGHT = 480
XC = WIDTH / 2
YC = HEIGHT / 2
CSV_PATH = os.path.join(os.path.abspath(os.path.join(DATASET, '..')), f'{os.path.basename(DATASET)}.csv')


def extract_keypoints (results):
  '''
  取得圖像內人體骨架座標
  
  參數:
  results: 圖像資訊
  '''

  landmarks = results.pose_landmarks.landmark

  nose_value = landmarks[mp_pose.PoseLandmark.NOSE.value]
  
  left_shoulder_value = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
  right_shoulder_value = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value]
  
  left_elbow_value = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value]
  right_elbow_value = landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value]
  
  left_wrist_value = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value]
  right_wrist_value = landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value]
  
  left_hip_value = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value]
  right_hip_value = landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value]

  left_knee_value = landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value]
  right_knee_value = landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value]

  left_ankle_value = landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value]
  right_ankle_value = landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value]

  origin_pose_x = [
    (1 - x) * WIDTH for x in [
      nose_value.x,
      left_shoulder_value.x,
      right_shoulder_value.x,
      left_elbow_value.x,
      right_elbow_value.x,
      left_wrist_value.x,
      right_wrist_value.x,
      left_hip_value.x,
      right_hip_value.x,
      left_knee_value.x,
      right_knee_value.x,
      left_ankle_value.x,
      right_ankle_value.x
    ]
  ]

  origin_pose_y = [
    (1 - y) * HEIGHT for y in [
      nose_value.y,
      left_shoulder_value.y,
      right_shoulder_value.y,
      left_elbow_value.y,
      right_elbow_value.y,
      left_wrist_value.y,
      right_wrist_value.y,
      left_hip_value.y,
      right_hip_value.y,
      left_knee_value.y,
      right_knee_value.y,
      left_ankle_value.y,
      right_ankle_value.y
    ]
  ]
  
  return np.concatenate([origin_pose_x, origin_pose_y])


def dis_keypoints (keypoints):
  bm_x, bm_y = [(keypoints[7] + keypoints[8]) / 2, (keypoints[20] + keypoints[21]) / 2]
  dis_x, dis_y = [bm_x - XC, bm_y - YC]

  return np.concatenate([
    [keypoints[x] - dis_x for x in range(0, 13)], 
    [keypoints[y] - dis_y for y in range(13, 26)]
  ])


def create_csv ():
  with open(CSV_PATH, 'w+', newline='') as csv:
    write = writer(csv)

    write.writerow(np.concatenate([
      ['frame', 'labels'],
      [f'x{i}' for i in range(1, 14)], 
      [f'y{i}' for i in range(1, 14)]
    ]))


os.chdir(DATASET)
create_csv()

with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
  for index, file in enumerate(IMAGE_FILES, start=1):
    frame = cv2.imread(file)

    frame.flags.writeable = False
    results = pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    frame.flags.writeable = True

    if results.pose_landmarks:
      keypoints = extract_keypoints(results)
      keypoints = dis_keypoints(keypoints)
    else:
      np.zeros(26)

    with open(os.path.join(os.path.abspath(os.path.join(DATASET, '..')), 'labels_3.csv')) as csv:
      reader = DictReader(csv)

      for row in reader:
        if row['frame'] == str(index):
          with open(CSV_PATH, 'a+', newline='') as csv:
            write = writer(csv)
            
            write.writerow(np.concatenate([
              [
                file.split('.')[0], 
                1 if (int(row['frame']) <= 8000 and row['labels'] == '1') or (int(row['frame']) > 8000 and row['labels'] == '3') else 0
              ],
                keypoints
              ]
            ))

          break
    
    sys.stdout.write(f'\rLOADING:    {str(round(index / len(IMAGE_FILES) * 100, 1)).zfill(2)}%')
    sys.stdout.flush()