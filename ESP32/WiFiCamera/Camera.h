#ifndef CAMERA_H
#define CAMERA_H

#include <WiFi.h>
#include <WebServer.h>
#include <WiFiClient.h>
#include "OV2640.h"
#include "SimStreamer.h"
#include "OV2640Streamer.h"
#include "CRtspSession.h"


class Camera {
  public:
    void init();
    void begin();
    void start();
};

#endif
