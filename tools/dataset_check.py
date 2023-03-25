import pandas as pd
import matplotlib.pyplot as plt
from argparse import ArgumentParser


def dataset_check (csv_file):
  data = pd.read_csv(csv_file)

  data_no_labels = data.drop(columns=['frame', 'labels'])

  print(f'數據描述性統計量: {data.describe()}')

  data_no_labels.hist(bins=50, figsize=(20, 15))
  plt.show()

  data_no_labels.plot(kind='box', subplots=True, layout=(5, 5), sharex=False, sharey=False, figsize=(20, 20))
  plt.show()


if __name__ == '__main__':
  parser = ArgumentParser(description='檢查數據分佈情形')
  parser.add_argument('csv_file', help='數據集')
  
  dataset_check(parser.parse_args().csv_file)
