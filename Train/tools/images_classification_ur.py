import os
import csv
import shutil


dataset = input('DATASET: ')
folder_path = os.path.join(dataset, 'images')

def init ():
  '''
  初始化
  '''
  
  if not os.path.exists(folder_path):
    os.makedirs(folder_path)
    
  for name in ['0', '1', '2']:
    classification_folder_path = os.path.join(folder_path, name)
    if not os.path.exists(classification_folder_path):
      os.makedirs(classification_folder_path)


def copy_image ():
  '''
  圖像分類
  '''
  
  for i in [0, 1]:
    base_path = os.path.join(dataset, str(i))
    folders = list(map(str, range(1, 41 - i * 10)))
    labels = 'urfall-cam0-adls.csv' if i == 0 else 'urfall-cam0-falls.csv'
    
    with open(os.path.join(dataset, labels)) as csv_file:
      reader = csv.reader(csv_file)
      next(reader)

      for row in reader:
        folders = str(int(row[0].split('-')[1]))
        folder = f'{row[0]}-cam0-rgb'
        frame = f'{folder}-{str(row[1]).zfill(3)}.png'
        label = str(int(row[2]) + 1)

        src_file = os.path.join(base_path, folders, folder, frame)
        dst_file = os.path.join(folder_path, label, frame)

        shutil.copy(src_file, dst_file)


init()
copy_image()
