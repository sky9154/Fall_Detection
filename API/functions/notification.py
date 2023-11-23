from fastapi import Response
from datetime import datetime, timezone, timedelta
from discord_webhook import DiscordWebhook, DiscordEmbed
import requests
import functions.mongodb as mongodb


async def get_token () -> dict:
  '''
  取得 Notification Token
  '''

  results = await mongodb.find('Notification', { })
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

  await mongodb.update('Notification', { 
    'class': 'line' 
  }, { 
    '$set': {
      'token': line
    }
  })

  await mongodb.update('Notification', { 
    'class': 'discord' 
  }, { 
    '$set': {
      'token': discord
    }
  })


async def line_notify (data: dict) -> Response:
  '''
  發送 Line Notify
  '''

  result = await get_token()

  line_token = result['line']

  now = datetime.now(tz=timezone(timedelta(hours=8)))

  message = ''
  message += f'\n{now.strftime("%Y/%m/%d %H:%M:%S")}'
  message += f'\n可能發生跌倒!'
  message += f'\n\n當前環境\n{"-" * 20}'
  message += f'\n溫度:\n{data["temperature"]} °C'
  message += f'\n瓦斯:\n{data["mq5"]["data"]} %  ({data["mq5"]["state"]})'
  message += f'\n一氧化碳:\n{data["mq9"]["data"]} %  ({data["mq9"]["state"]})'

  url = 'https://notify-api.line.me/api/notify'

  headers = {
    'Authorization': f'Bearer {line_token}'
  }

  payload = {
    'message': message
  }

  with open('assets/images/fall.png', 'rb') as image:
    response = requests.post(
      url,
      headers = headers,
      data = payload,
      files = {
        'imageFile': image
      }
    )

    return response


async def discord_notify (data: dict) -> Response:
  '''
  發送 Discord Notify
  '''

  result = await get_token()

  discord_token = result['discord'].split(' ')

  now = datetime.now(tz=timezone(timedelta(hours=8)))

  message = '# 跌倒通知\n'
  message += f'{now.strftime("%Y/%m/%d %H:%M:%S")}\n'
  message += f'可能發生跌倒!\n'
  message += f'### 當前環境\n{"-" * 40}'

  url = f'https://discord.com/api/webhooks/{discord_token[0]}/{discord_token[1]}'

  webhook = DiscordWebhook(url=url)

  with open('assets/images/fall.png', 'rb') as image:
    webhook.add_file(image.read(), 'fall.png')

  embed = DiscordEmbed(description=message, color=16769024)
  embed.add_embed_field(
    '溫度：',
    f'{data["temperature"]} °C',
    False
  )
  embed.add_embed_field(
    '瓦斯：',
    f'{data["mq5"]["data"]} %  ({data["mq5"]["state"]})',
    True
  )
  embed.add_embed_field(
    '一氧化碳：',
    f'{data["mq9"]["data"]} %  ({data["mq9"]["state"]})',
    True
  )
  embed.set_image(url='attachment://fall.png')
  embed.set_footer(text='Powered by oF', icon_url='https://i.imgur.com/sUBvjuf.jpg')
  embed.set_timestamp()

  webhook.add_embed(embed)

  response = webhook.execute()

  return response
