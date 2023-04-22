import os
import sys
import cv2
import numpy as np
from mediapipe import solutions
from csv import writer, DictReader


mp_drawing = solutions.drawing_utils
mp_drawing_styles = solutions.drawing_styles
mp_pose = solutions.pose

folder = input('DATASET: ')

WIDTH = 640
HEIGHT = 480
XC = WIDTH / 2
YC = HEIGHT / 2

def extract_keypoints (results):
  '''
  取得圖像內人體骨架座標
  
  參數:
  results: 圖像資訊
  '''

  landmarks = results.pose_landmarks.landmark

  keypoints = [landmarks[i] for i in [0] + list(range(11, 17)) + list(range(23, 29))]

  pose_x = [(1 - keypoint.x) * WIDTH for keypoint in keypoints]
  pose_y = [(1 - keypoint.y) * HEIGHT for keypoint in keypoints]

  return np.concatenate([pose_x, pose_y])


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


for data in ['LEFT_BOTTOM', 'LEFT_TOP', 'RIGHT_BOTTOM', 'RIGHT_TOP', 'ROTATE_45', 'ROTATE_135', 'ROTATE_225', 'ROTATE_315']:
  DATASET = os.path.join(folder, data)
  IMAGE_FILES = os.listdir(DATASET)
  CSV_PATH = os.path.join(os.path.abspath(os.path.join(DATASET, '..')), f'{os.path.basename(DATASET)}.csv')
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
        # keypoints = dis_keypoints(keypoints)
      else:
        keypoints = np.zeros(26)

      with open(os.path.join(os.path.abspath(os.path.join(DATASET, '..')), 'labels.csv')) as csv:
        reader = DictReader(csv)

        for row in reader:
          if row['frame'] == str(index):
            with open(CSV_PATH, 'a+', newline='') as csv:
              write = writer(csv)
              
              write.writerow(np.concatenate([
                [
                  file.split('.')[0], 
                  1 
                  if (int(row['frame']) <= 8000 and row['labels'] == '1') 
                  or (int(row['frame']) > 8000 and (row['labels'] == '3'))
                  else 
                  0
                ],
                  keypoints
                ]
              ))

            break
      
      sys.stdout.write(f'\rLOADING:    {str(round(index / len(IMAGE_FILES) * 100, 1)).zfill(2)}%')
      sys.stdout.flush()
    
    print()
