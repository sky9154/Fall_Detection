#include "Manager.h"


WebServer webServer(80);
WiFiManager wifiManager;

unsigned int timeout    = 120;
unsigned int startTime  = millis();
bool portalRunning      = false;
bool startAP            = true;

void Manager::init(void) {
  WiFi.mode(WIFI_STA);

  Serial.setDebugOutput(true);

  delay(1000);
  pinMode(TRIGGER_PIN, INPUT_PULLUP);

  wifiManager.setHostname(AP_HOSTNAME);
  wifiManager.setDebugOutput(true);
  wifiManager.autoConnect(AP_SSID, AP_PASSWORD);

  if (WiFi.status() == WL_CONNECTED && wifiManager.getWiFiIsSaved()) {
    Serial.println("晶片存有Wi-Fi連線資料！");
  } else {
    Serial.println("晶片沒有Wi-Fi連線資料…");
  }
}


void Manager::web(void) {
  webServer.on("/", []() {
    webServer.send(200, "text/html; charset=utf-8", "");
  });
  webServer.onNotFound([]() {
    webServer.send(404, "text/plain", "File NOT found!");
  });

  webServer.begin();
}


void Manager::start(void) {
  if (portalRunning) {
    wifiManager.process();

    if ((millis() - startTime) > (timeout * 1000)) {
      Serial.println("「Wi-Fi設置入口」操作逾時…");
      portalRunning = false;

      if (startAP) {
        wifiManager.stopConfigPortal();
      } else {
        wifiManager.stopWebPortal();
      }

      webServer.begin();
    }
  }

  if (digitalRead(TRIGGER_PIN) == LOW && (!portalRunning)) {
    webServer.stop();

    if (startAP) {
      Serial.println("按鈕被按下了，啟動設置入口。");

      wifiManager.setConfigPortalBlocking(false);
      wifiManager.startConfigPortal(AP_SSID, AP_PASSWORD);
    } else {
      Serial.println("按鈕被按下了，啟動Web入口。");

      wifiManager.startWebPortal();
    }

    portalRunning = true;
    startTime = millis();
  }

  webServer.handleClient();
}
