from .user import router as User
from .device import router as Device
from .detection import router as Detection
from .contact import router as Contact
from .notification import router as Notification
import os
import glob


files = glob.glob(os.path.join('api', '*.py'))
files = [os.path.splitext(os.path.basename(file))[0] for file in files]
files = [name.capitalize() for name in files if name != '__init__']

__all__ = files
