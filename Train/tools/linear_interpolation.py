import pandas as pd
import sys
from scipy.interpolate import interp1d
from argparse import ArgumentParser


def linear_interpolation (csv_file):
  df = pd.read_csv(csv_file)

  for i in range(len(df)):
    if i > 0 and df.loc[i, 'labels'] != df.loc[i - 1, 'labels']:
      continue
    
    for j in range(1, 14):
      x_name = f'x{str(j)}'
      y_name = f'y{str(j)}'

      if df.loc[i, x_name] == 0:
        mask = df[x_name] != 0

        f = interp1d(df[mask].index, df[mask][x_name], kind='linear', fill_value='extrapolate')

        df.loc[i, x_name] = f(i)

      if df.loc[i, y_name] == 0:
        mask = df[y_name] != 0

        f = interp1d(df[mask].index, df[mask][y_name], kind='linear', fill_value='extrapolate')

        df.loc[i, y_name] = f(i)

    sys.stdout.write(f'\rLOADING:    {str(round(i / len(df) * 100, 1)).zfill(2)}%')
    sys.stdout.flush()

  df.to_csv('linear_interpolation.csv', index=False)


if __name__ == '__main__':
  parser = ArgumentParser(description='補足缺失資料')
  parser.add_argument('csv_file', help='數據集')
  
  linear_interpolation(parser.parse_args().csv_file)
  