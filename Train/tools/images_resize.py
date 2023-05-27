import os
import sys
from PIL import Image

def images_resize (dataset):
  '''
  將圖片尺寸修改為 (640, 480)
  '''
  
  for folder in os.listdir(dataset):
    path = os.path.join(dataset, folder, 'images')

    if not os.path.isdir(path):
      os.mkdir(path)

    imgs = os.path.join(dataset, folder, 'rgb')

    for index, img in enumerate(os.listdir(imgs), start=1):
      Image.open(os.path.join(imgs, img)).resize((640, 480)).save(os.path.join(path, f'{str(folder).zfill(4)}_{os.path.basename(img)}'))
      
      sys.stdout.write(f'\r【 {str(folder).zfill(4)} 】 {round(index / len(os.listdir(imgs)) * 100, 1)}%')
      sys.stdout.flush()
    
    print()


images_resize(input('DATASET: '))