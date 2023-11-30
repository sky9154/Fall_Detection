#ifndef SENSOR_H
#define SENSOR_H

#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <SimpleDHT.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>


#define DS18B20_PIN   4
#define MQ5_PIN       34
#define MQ9_PIN       39
#define API_HOST      "1.34.174.145"
#define API_PORT      "432"

class Sensor {
  public:
    void upload();
};

#endif
