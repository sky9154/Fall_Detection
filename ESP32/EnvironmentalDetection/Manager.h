#ifndef MANAGER_H
#define MANAGER_H

#include <PubSubClient.h>
#include <WiFiManager.h>
#include <ESPmDNS.h>
#include <WebServer.h>


#define AP_SSID           "EnvironmentalDetection"
#define AP_PASSWORD       NULL
#define AP_HOSTNAME       "EnvironmentalDetection"
#define TRIGGER_PIN       0

class Manager {
  public:
    void init();
    void web();
    void start();
};

#endif
