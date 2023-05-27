import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import api


load_dotenv()

def create_app ():
  app = FastAPI(debug=True)

  app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
  )

  return app


app = create_app()

routers = [
  api.authentication_router,
  api.detection_router,
  api.introduction_card_router,
  api.notification_router,
  api.settings_router
]

for router in routers:
  app.include_router(router, prefix='/api')

IP = os.getenv('IP')
PORT = int(os.getenv('PORT'))

if __name__ == '__main__':
  uvicorn.run(app, host=IP, port=PORT)
