import os
import pymongo
from dotenv import load_dotenv


load_dotenv()

DB_IP = os.getenv('DB_IP')
DB_PORT = os.getenv('DB_PORT')

client = pymongo.MongoClient([f'{DB_IP}:{DB_PORT}'])

db = client['Fall_Detection']


async def insert (collection_name: str, data: dict):
  '''
  新增資料
  '''

  collection = db[collection_name]
  collection.insert_one(data)


async def find (collection_name: str, filter: dict) -> list:
  '''
  查詢資料
  '''

  collection = db[collection_name]

  results = collection.find(filter, { '_id': 0 })

  data = [result for result in results]

  return data


async def update (collection_name: str, query: dict, new_values: dict):
  '''
  更新資料
  '''

  collection = db[collection_name]
  collection.update_one(query, new_values)


async def delete (collection_name: str, query: dict):
  '''
  刪除資料
  '''

  collection = db[collection_name]
  collection.delete_one(query)
  