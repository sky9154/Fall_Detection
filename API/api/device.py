from fastapi import APIRouter, Depends
from functions import token, device


router = APIRouter()

@router.get('/get')
async def get (token_payload: dict = Depends(token.get)):
  return {
    'devices': await device.get()
  }