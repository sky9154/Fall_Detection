import functions.mongodb as mongodb


async def get ():
  '''
  取得裝置資料
  '''

  return await mongodb.find('Device', { })