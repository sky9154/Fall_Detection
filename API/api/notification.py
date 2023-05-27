from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from datetime import datetime, timezone, timedelta
from functions import token, notification


router = APIRouter()

@router.get('/notification/token')
async def get_token (token_payload: dict = Depends(token.get)):
  result = await notification.get_token()

  return JSONResponse(content = { 
    'line': result['line'],
    'discord': result['discord']
  })


@router.post('/notification/line')
async def line_notify (token_payload: dict = Depends(token.get)):
  now = datetime.now(tz=timezone(timedelta(hours=8)))

  message = f'\n{now.strftime("%Y/%m/%d %H:%M:%S")}\n可能發生跌倒!'

  response = await notification.line_notify(message)

  if response.status_code == 200:
    print('INFO:     圖片已發送！')
  else:
    print(f'ERROR:    {response.status_code}')
