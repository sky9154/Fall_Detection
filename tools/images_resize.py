import os
import sys
from PIL import Image
from argparse import ArgumentParser


def images_resize (dataset):
  '''
  將圖片尺寸修改為 (640, 480)
  
  參數:
  dataset: 資料集路徑
  '''
  
  for folder in os.listdir(dataset):
    path = os.path.join(dataset, folder, 'images')

    if not os.path.isdir(path):
      os.mkdir(path)

    imgs = os.path.join(dataset, folder, 'rgb')

    for index, img in enumerate(os.listdir(imgs), start=1):
      Image.open(os.path.join(imgs, img)).resize((640, 480)).save(os.path.join(path, os.path.basename(img)))
      
      sys.stdout.write(f'\r【 {str(folder).zfill(4)} 】 {round(index / len(os.listdir(imgs)) * 100, 1)}%')
      sys.stdout.flush()
    
    print()


if __name__ == '__main__':
  parser = ArgumentParser(description='調整圖像大小')
  parser.add_argument('dataset', help='數據集')
  
  images_resize(parser.parse_args().dataset)
