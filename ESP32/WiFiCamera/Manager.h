#ifndef MANAGER_H
#define MANAGER_H

#include <PubSubClient.h>
#include <WiFiManager.h>
#include <ESPmDNS.h>
#include <WebServer.h>


#define AP_SSID           "WiFiCamera"
#define AP_PASSWORD       NULL
#define AP_HOSTNAME       "WiFiCamera"
#define TRIGGER_PIN       0

extern unsigned int       timeout;
extern unsigned int       startTime;
extern bool               portalRunning;
extern bool               startAP;

extern WebServer          webServer;
extern WiFiManager        wifiManager;

class Manager {
  public:
    void init();
    void web();
    void start();
};

#endif
