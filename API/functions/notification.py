from fastapi import Response
import requests
import functions.mongodb as mongodb


line_token = None

async def get_token () -> dict:
  '''
  取得 Notification Token
  '''

  results = await mongodb.find('NotificationToken', { })
  line = ''
  discord = ''

  for result in results:
    if (result['class'] == 'line'):
      line = result['token']
    else:
      discord = result['token']

  return {
    'line': line,
    'discord': discord
  }


async def update_token (line: str, discord: str):
  '''
  修改 Notification Token
  '''

  await mongodb.update('NotificationToken', { 
    'class': 'line' 
  }, { 
    '$set': {
      'token': line
    }
  })

  await mongodb.update('NotificationToken', { 
    'class': 'discord' 
  }, { 
    '$set': {
      'token': discord
    }
  })


async def line_notify (message: str) -> Response:
  '''
  發送 Line Notify
  '''

  global line_token

  if not line_token:
    result = await get_token()

    line_token = result['line']

  url = 'https://notify-api.line.me/api/notify'

  headers = {
    'Authorization': f'Bearer {line_token}'
  }

  payload = {
    'message': message
  }

  with open('temp/fall.png', 'rb') as image:
    response = requests.post(
      url,
      headers = headers,
      data = payload,
      files = {
      'imageFile': image
    })

    return response
