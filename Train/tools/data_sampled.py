import pandas as pd
import os

dataset = input('DATASET: ')
folder_path = os.path.join(dataset, 'images')
sampled_path = os.path.join(folder_path, 'sampled')

if not os.path.exists(sampled_path):
  os.makedirs(sampled_path)

for i in ['1', '2', '3']:
  df = pd.read_csv(os.path.join(folder_path, f'{i}.csv'))

  sampled_df = df.sample(n=8500, random_state=1)

  sampled_df.to_csv(os.path.join(sampled_path, f'{i}.csv'), index=False)
