import functions.mongodb as mongodb


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
