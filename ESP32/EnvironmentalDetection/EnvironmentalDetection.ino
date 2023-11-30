#include "Manager.h"
#include "Sensor.h"


Manager manager;
Sensor  sensor;

void setup() {
  Serial.begin(115200);

  manager.init();
  manager.web();
}

void loop() {
  manager.start();
  sensor.upload();

  delay(300000);
}
