from fastapi import APIRouter, Depends
from datetime import timezone, timedelta, datetime
from functions import token, device


router = APIRouter()

@router.get('/get')
async def get (token_payload: dict = Depends(token.get)):
  return {
    'devices': await device.get_all()
  }


@router.post('/upload')
async def upload (data: dict):
  now = datetime.now(tz=timezone(timedelta(hours=8)))

  data['time'] = now.strftime('%Y/%m/%d %H:%M:%S')

  await device.show(data)

  await device.upload(data)


@router.post('/camera')
async def camera (data: dict):
  # {'ip': '172.20.10.4', 'mac': 'E0:5A:1B:D0:FB:EC', 'temperature': '29.3 °C', 'gas': '0.0 %', 'co': '3.2 %'}
  print(data)