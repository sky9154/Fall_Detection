#include <WiFi.h>
#include <WebServer.h>
#include <WiFiClient.h>
#include <TFT_eSPI.h>
#include "OV2640.h"
#include "SimStreamer.h"
#include "OV2640Streamer.h"
#include "CRtspSession.h"
#include "wifi_key.h"

WebServer server(80);
WiFiServer rtspServer(554);

OV2640 cam;
CStreamer *streamer;
TFT_eSPI tft = TFT_eSPI();


void initTFT () {
  tft.begin();
  tft.setRotation(1);
  tft.setTextSize(2);
  tft.fillScreen(TFT_BLACK);
}


void handle_jpg_stream (void) {
  WiFiClient client = server.client();

  String response = "HTTP/1.1 200 OK\r\n";\

  response += "Content-Type: multipart/x-mixed-replace; boundary=frame\r\n\r\n";

  server.sendContent(response);

  while (1) {
    cam.run();

    if (!client.connected()) {
      break;
    }
      
    response = "--frame\r\n";
    response += "Content-Type: image/jpeg\r\n\r\n";

    server.sendContent(response);

    client.write((char *) cam.getfb(), cam.getSize());

    server.sendContent("\r\n");

    if (!client.connected()) {
      break;
    }
  }
}


void handle_jpg (void) {
  WiFiClient client = server.client();

  cam.run();

  if (!client.connected()) {
    return;
  }

  String response = "HTTP/1.1 200 OK\r\n";
  response += "Content-disposition: inline; filename=capture.jpg\r\n";
  response += "Content-type: image/jpeg\r\n\r\n";

  server.sendContent(response);

  client.write((char *) cam.getfb(), cam.getSize());
}


void handleNotFound () {
  String message = "Server is running!\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";

  server.send(200, "text/plain", message);
}


void WifiConnecte () {
  WiFi.begin(ssid, password);

  int connect_number = 0;
  tft.setCursor(0, 10);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    
    tft.print(".");
    
    connect_number ++;

    if (connect_number > 10) {
      connect_number = 0;

      tft.fillScreen(TFT_BLACK);
      tft.setCursor(0, 10);
    }
  }
  IPAddress ip = WiFi.localIP();

  tft.fillScreen(TFT_BLACK);
  tft.setCursor(0, 10);
  tft.print("WiFi connected");

  delay(1000);
  
  tft.fillScreen(TFT_BLACK);
  tft.setCursor(0, 10);
  tft.println("RTSP Stream Link:\n");
  tft.println(ip.toString() + "/mjpeg/1");
}

void setup () {
  Serial.begin(115200);
  
  esp32cam_aithinker_config.frame_size = FRAMESIZE_VGA;
  esp32cam_aithinker_config.jpeg_quality = 10;

  cam.init(esp32cam_aithinker_config);

  sensor_t * s = esp_camera_sensor_get();

  s -> set_vflip(s, 1);
  
  initTFT();
  WifiConnecte();
  
  server.on("/", HTTP_GET, handle_jpg_stream);
  server.on("/jpg", HTTP_GET, handle_jpg);
  server.onNotFound(handleNotFound);
  server.begin();
  
  rtspServer.begin();
  
  streamer = new OV2640Streamer(cam);
}

void loop () {
  if (WiFi.status() != WL_CONNECTED) {
    WifiConnecte();
  }
  
  server.handleClient();
  
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