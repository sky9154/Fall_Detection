#include "Sensor.h"


StaticJsonDocument<200> doc;
OneWire oneWire(DS18B20_PIN);
DallasTemperature sensors(&oneWire);


void Sensor::upload (void) {
  float MQ_5_volt = analogRead(MQ5_PIN);
  float MQ_9_volt = analogRead(MQ9_PIN);
  float temperature = 0.0;

  MQ_5_volt /= (1024 * 5.0);
  MQ_5_volt *= 100;
  MQ_9_volt /= (1024 * 5.0);
  MQ_9_volt *= 100;

  sensors.requestTemperatures();
  temperature = sensors.getTempCByIndex(0);

  WiFiClient client;
  HTTPClient http;

  http.begin(client, "http://" + String(API_HOST) + ":" + String(API_PORT) + "/api/device/upload");
  http.addHeader("Content-Type", "application/json");

  doc["ip"] = WiFi.localIP();
  doc["mac"] = WiFi.macAddress();
  doc["temperature"] = String(temperature, 1) + " °C";
  doc["gas"] = String(MQ_5_volt, 1) + " %";
  doc["co"] = String(MQ_9_volt, 1) + " %";

  String sensor;
  serializeJson(doc, sensor);

  http.POST(sensor);
  http.end();
}
