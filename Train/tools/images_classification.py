import os
import csv
import sys
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
  
  for folders in os.listdir(dataset):
    if (folders != 'images'):
      base_path = os.path.join(dataset, folders, 'images')
      labels = os.path.join(dataset, folders, 'labels.csv')

      row_count = 0

      with open(labels) as csv_file:
        reader = csv.reader(csv_file)
        next(reader)

        row_count = sum(1 for row in reader)
      
      with open(labels) as csv_file:
        reader = csv.reader(csv_file)
        next(reader)

        for index, row in enumerate(reader, start=1):
          frame = f'{str(folders).zfill(4)}_rgb_{str(row[0]).zfill(4)}.png'

          match int(row[1]):
            case 1:
              label = '0'
            case 2 | 4:
              label = '1'
            case 3 | 5:
              label = '2'
            case _:
              continue
          
          src_file = os.path.join(base_path, frame)
          dst_file = os.path.join(folder_path, label, frame)

          if not os.path.isfile(src_file):
            continue
          
          shutil.copy(src_file, dst_file)

          sys.stdout.write(f'\r【 {folders} 】 {round(index / row_count * 100, 1)}%')
          sys.stdout.flush()

        print()


init()
copy_image()
