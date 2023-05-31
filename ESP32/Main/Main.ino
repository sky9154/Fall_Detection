#include <WiFi.h>
#include<SimpleDHT.h>
#include<Wire.h>
#include<Adafruit_GFX.h>
#include<Adafruit_SSD1306.h>
#include <OneWire.h> 
#include <DallasTemperature.h> 
#include <ESP32Servo.h>
#include "wifi.h"
#include "tools.h"
#include "scale.h"


WiFiServer server(8080);

Adafruit_SSD1306 display(CREEN_WIDTH, CREEN_HEIGHT, &Wire, OLED_RESET);
OneWire oneWire(DS18B20_PIN);
DallasTemperature sensors(&oneWire);

void init_display () {
  bool OLEDStatus = true;
  
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3c)) {
    Serial.println(F("SSD1306 allocation falled"));
    
    OLEDStatus = false;
  }
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
}

void connect_WiFi () {
  WiFi.begin(SSID, PASSWORD);

  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Connecting to Wi-Fi..");
  display.display();
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

char* floatToString (float number) {
  char* str = (char*) malloc(20 * sizeof(char));
  
  sprintf(str, "%f", number);
  
  return str;
}

char* sensor () {
  float MQ_5_volt = analogRead(MQ5_PIN);
  float MQ_9_volt = analogRead(MQ9_PIN);
  float temp = 0.0;
  
  MQ_5_volt /= (1024 * 5.0);
  MQ_9_volt /= (1024 * 5.0);

  sensors.requestTemperatures();
  temp = sensors.getTempCByIndex(0);

  char* MQ_5 = floatToString(MQ_5_volt);
  char* MQ_9 = floatToString(MQ_9_volt);
  char* Temp = floatToString(temp);

  char* result = (char*)malloc(60 * sizeof(char));

  sprintf(result, "%s %s %s", MQ_5, MQ_9, Temp);

  free(MQ_5);
  free(MQ_9);
  free(Temp);

  return result;
}

void beep_beep () {
  int melody[] = {NOTE_C4, NOTE_C4};
  int noteDurations[] = {500, 500};
  int melodyLength = sizeof(melody) / sizeof(melody[0]);

  for (int thisNote = 0; thisNote < melodyLength; thisNote ++) {
    int noteDuration = noteDurations[thisNote];
    int pauseBetweenNotes = noteDuration * 0.3;

    tone(SPEAKER_PIN, melody[thisNote], noteDuration);

    delay(pauseBetweenNotes);

    noTone(SPEAKER_PIN);
  }
}

void setup () {
  Serial.begin(115200);
  sensors.begin();

  init_display();
  
  connect_WiFi();

  delay(1000);
  
  server.begin();

  String ip = WiFi.localIP().toString();

  for (int i = 20; i >= 0; i --) {
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("Server started!");
    display.println("\nIP: " + ip);
    display.println("\n" + String(i < 10 ? "0" : "") + String(i) + "s");
    display.display();

    delay(1000);
  }

  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Server started!");
  display.println("\nIP: " + ip);
  display.println("\nMQ5 Is Ready!");
  display.println("\nMQ9 Is Ready!!");
  display.display();
}

void loop () {
  float MQ_5_volt = analogRead(MQ5_PIN);
  float MQ_9_volt = analogRead(MQ9_PIN);
  float temp = 0.0;
  
  MQ_5_volt /= (1024 * 5.0);
  MQ_9_volt /= (1024 * 5.0);

  sensors.requestTemperatures();
  temp = sensors.getTempCByIndex(0);

  WiFiClient client = server.available();
  
  if (client) {
    while (client.connected()) {
      if (client.available()) {
        String message = client.readStringUntil('\r');
        
        if (strcmp(message.c_str(), "sensor") == 0) {
          client.println(sensor());
          
          beep_beep();
        }
      }
    }
  }

  client.stop();
}
