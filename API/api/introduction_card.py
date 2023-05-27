from fastapi import Depends, APIRouter
from fastapi.responses import JSONResponse
from functions import token, introduction_card

router = APIRouter()

@router.get('/introduction_card')
async def get_introduction_card (token_payload: dict = Depends(token.get)):
  results = await introduction_card.get()

  return JSONResponse(content = {
    'introduction_card': results
  })
