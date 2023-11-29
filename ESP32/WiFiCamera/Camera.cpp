#include "Camera.h"


WiFiServer rtspServer(554);

OV2640 cam;
CStreamer *streamer;


void Camera::init(void) {
  esp32cam_aithinker_config.frame_size = FRAMESIZE_VGA;
  esp32cam_aithinker_config.jpeg_quality = 10;

  cam.init(esp32cam_aithinker_config);
}

void Camera::begin(void) {
  rtspServer.begin();
  
  streamer = new OV2640Streamer(cam);
}


void Camera::start(void) {
  uint32_t msecPerFrame = 100;
  static uint32_t lastimage = millis();
  
  streamer -> handleRequests(0);
  
  uint32_t now = millis();
  
  if (streamer -> anySessions()) {
    if (now > lastimage + msecPerFrame || now < lastimage) {
      streamer -> streamImage(now);
      lastimage = now;

      now = millis();
      if (now > lastimage + msecPerFrame) {
        printf("warning exceeding max frame rate of %d ms\n", now - lastimage);
      }
    }
  }
  
  WiFiClient rtspClient = rtspServer.accept();
  
  if (rtspClient) {
    streamer -> addSession(rtspClient);
  }
}
