from functions import mongodb


async def get ():
  '''
  取得緊急聯絡人
  '''
  
  results = await mongodb.find('IntroductionCard', { })

  return results
