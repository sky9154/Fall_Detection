from mediapipe import solutions
import csv
import numpy  as np
import cv2
import sys
import os


folder = os.path.join(input('DATASET: '), 'images')
os.chdir(folder)

mp_pose = solutions.pose
pose = mp_pose.Pose(
  min_detection_confidence=0.5, 
  min_tracking_confidence=0.5
)

def create_csv ():
  '''
  初始化 CSV
  '''

  for i in ['0', '1', '2']:
    with open(f'{i}.csv', 'w+', newline='') as csv_file:
      writer = csv.writer(csv_file)

      writer.writerow(np.concatenate([
        ['frame', 'labels'],
        [f'x{i}' for i in range(1, 14)], 
        [f'y{i}' for i in range(1, 14)]
      ]))
  

def extract_keypoints (results):
  '''
  提取特徵點
  '''

  landmarks = results.landmark

  indices = [0] + list(range(11, 17)) + list(range(23, 29))

  pose_x = [landmarks[i].x * 1280 for i in indices]
  pose_y = [landmarks[i].y * 720 for i in indices]

  return np.concatenate([pose_x, pose_y])


def write_csv ():
  '''
  寫入特徵點
  '''
  
  for data in ['0', '1', '2']:
    for index, image in enumerate(os.listdir(data), start=1):
      frame = cv2.imread(os.path.join(data, image))

      height, width = frame.shape[:2]
      aspect_ratio = width / height

      new_width = int(height * 16 / 9)
      new_aspect_ratio = 16 / 9

      if abs(aspect_ratio - new_aspect_ratio) > 0.001:
        pad = int((new_width - width) / 2)

        new_frame = np.zeros((height, new_width, 3), np.uint8)
        new_frame[:, pad : pad + width] = frame
      else:
        new_frame = frame

      new_frame = cv2.resize(new_frame, (1280, 720), interpolation = cv2.INTER_AREA)

      results = pose.process(cv2.cvtColor(new_frame, cv2.COLOR_BGR2RGB))

      if results.pose_landmarks:
        keypoints = extract_keypoints(results.pose_landmarks)
      else:
        continue
    
      with open(f'{data}.csv', 'a+', newline='') as csvfile:
        writer = csv.writer(csvfile)

        name = image.split('-')
        name = f'{name[0]}-{name[1]}-{name[4]}'

        # name = image.split('_')
        # name = f'{name[0]}-{name[2]}'
        
        content = np.concatenate([[name.split('.')[0], data], keypoints])

        writer.writerow(content)

      sys.stdout.write(f'\r【 {data} 】 {round(index / len(os.listdir(data)) * 100, 1)}%')
      sys.stdout.flush()

    print()


create_csv()
write_csv()
