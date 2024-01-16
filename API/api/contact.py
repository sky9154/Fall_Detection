from fastapi import APIRouter, Depends
from functions import token, contact


router = APIRouter()

@router.get('/get')
async def get (token_payload: dict = Depends(token.get)):
  results = await contact.get()

  return {
    'introduction_card': results
  }