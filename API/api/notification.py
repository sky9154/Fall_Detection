from fastapi import APIRouter, Depends, HTTPException, Form
from fastapi.responses import JSONResponse
from functions import token, notification, user, device


router = APIRouter()

@router.get('/get/token')
async def get_token (token_payload: dict = Depends(token.get)):
  result = await notification.get_token()

  return JSONResponse(content = {
    'line': result['line'],
    'discord': result['discord']
  })


@router.put('/update/token')
async def update_notification_token (
  token_payload: dict = Depends(token.get),
  line: str = Form(default=''),
  discord: str = Form(default='')
):
  user_role = token_payload['role']

  if user.check_role(user_role):
    line = line.strip()
    discord = discord.strip()

    await notification.update_token(line, discord)

    raise HTTPException(201, 'Notification token updated successfully')
  else:
    raise HTTPException(403, 'User does not have permission')


@router.post('/send')
async def send (token_payload: dict = Depends(token.get)):
  result = await device.get_environment()

  data = {
    'temperature': result['temperature'],
    'gas': {
      'data': result['gas'],
      'state': '正常' if float(result['gas'].split(' ')[0]) <= 7.5 else '危險'
    },
    'co': {
      'data': result['co'],
      'state': '正常' if float(result['co'].split(' ')[0]) <= 7.5 else '危險'
    }
  }

  response = await notification.line_notify(data)

  if response.status_code == 200:
    print('INFO:     Line 圖片已發送！')
  else:
    print(f'ERROR:    Line {response.status_code}')

  response = await notification.discord_notify(data)

  if response.status_code == 200:
    print('INFO:     Discord 圖片已發送！')
  else:
    print(f'ERROR:    Discord {response.status_code}')