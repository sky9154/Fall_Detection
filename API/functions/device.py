import json
import requests
from dotenv import load_dotenv
import os
import functions.mongodb as mongodb


load_dotenv()

async def get_all ():
  '''
  取得裝置資料
  '''

  return await mongodb.find('Device', { })


async def get (camera: str):
  '''
  取得指定裝置資料
  '''

  return await mongodb.find('Device', { 'camera': camera })


async def upload (data: dict):
  '''
  上傳環境資訊
  '''

  await mongodb.insert('Environment', data)


async def show (data: dict):
  '''
  顯示環境資訊
  '''

  API_IP = os.getenv('API_IP')
  API_PORT = int(os.getenv('API_PORT'))
  API_TOKEN = os.getenv('API_TOKEN')
  MAC = os.getenv('MAC')
  TEMPLATEID = os.getenv('TEMPLATEID')

  url = f'http://{API_IP}:{API_PORT}/user/api/mqtt/publish/{MAC}/template/{TEMPLATEID}'

  headers = {
    'Authorization': f'Bearer {API_TOKEN}',
    'Content-Type': 'application/json'
  }

  payload = {
    'data': {
      '地點': '房間 1',
      '溫度': data['temperature'],
      '瓦斯': data['gas'],
      '一氧化碳': data['co']
    }
  }

  requests.post(
    url,
    headers=headers,
    data=json.dumps(payload)
  )


async def get_environment ():
  '''
  取得環境資訊
  '''

  result = await mongodb.find('Environment', { })
  result = result[-1]

  return result