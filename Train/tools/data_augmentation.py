import os
from PIL import Image
from argparse import ArgumentParser
from sys import stdout


def image_top (save_path, save_name, image):
  '''
  將圖片分為: 正常 / 左右翻轉
  
  參數:
  save_path: 圖像儲存路徑
  image: 原始圖像路徑
  save_name: 圖像儲存名稱
  '''

  img = Image.open(image)

  img.save(os.path.join(save_path, 'LEFT_BOTTOM', f'lb_{save_name}'))

  img = img.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
  img.save(os.path.join(save_path, 'RIGHT_BOTTOM', f'rb_{save_name}'))


def image_bottom (save_path, save_name, image):
  '''
  將圖片分為: 上下翻轉 / 上下及左右翻轉
  
  參數:
  save_path: 圖像儲存路徑
  image: 原始圖像路徑
  save_name: 圖像儲存名稱
  '''
    
  img = Image.open(image)

  img = img.transpose(Image.Transpose.FLIP_TOP_BOTTOM)
  img.save(os.path.join(save_path, 'LEFT_TOP', f'lt_{save_name}'))

  img = img.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
  img.save(os.path.join(save_path, 'RIGHT_TOP', f'rt_{save_name}'))


def image_rotate (save_path, save_name, image):
  '''
  將圖片翻轉為: 45 度、135 度、225 度、315 度
  
  參數:
  save_path: 圖像儲存路徑
  image: 原始圖像路徑
  save_name: 圖像儲存名稱
  '''
  original_img = Image.open(image)

  img = original_img.rotate(45, fillcolor='green')
  img.save(os.path.join(save_path, 'ROTATE_45', f're45_{save_name}'))

  img = original_img.rotate(135, fillcolor='green')
  img.save(os.path.join(save_path, 'ROTATE_135', f're135_{save_name}'))

  img = original_img.rotate(225, fillcolor='green')
  img.save(os.path.join(save_path, 'ROTATE_225', f're225_{save_name}'))

  img = original_img.rotate(315, fillcolor='green')
  img.save(os.path.join(save_path, 'ROTATE_315', f're315_{save_name}'))


def data_augmentation (dataset_path):
  images_path = os.path.join(dataset_path, 'images')
  augmented_images_path = os.path.join(dataset_path, 'augmented')

  if not os.path.isdir(augmented_images_path):
    os.mkdir(augmented_images_path)

  for name in ['LEFT_TOP', 'LEFT_BOTTOM', 'RIGHT_TOP', 'RIGHT_BOTTOM', 'ROTATE_45', 'ROTATE_135', 'ROTATE_225', 'ROTATE_315']:
    augmented_folder_path = os.path.join(dataset_path, 'augmented', name)
    
    if not os.path.isdir(augmented_folder_path):
      os.mkdir(augmented_folder_path)

  for index, image in enumerate(os.listdir(images_path), start=1):
    total = len(os.listdir(images_path))
    progress = f'{str(index).zfill(len(str(total)))} / {total}'
    percentage = round(index / total * 100, 1)

    image_top(augmented_images_path, image, os.path.join(images_path, image))
    stdout.write(f'\rTOP      ({progress}):  {percentage}%')
    
    image_bottom(augmented_images_path, image, os.path.join(images_path, image))
    stdout.write(f'\rBOTTOM   ({progress}):  {percentage}%')

    image_rotate(augmented_images_path, image, os.path.join(images_path, image))
    stdout.write(f'\rROTATE   ({progress}):  {percentage}%')
    
    stdout.flush()
    
  print()


if __name__ == '__main__':
  parser = ArgumentParser(description='將圖像增強為八張')
  parser.add_argument('dataset_path', help='數據集路徑')
  
  data_augmentation(parser.parse_args().dataset_path)
