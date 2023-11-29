#include "Camera.h"
#include "Manager.h"


Camera camera;
Manager manager;

void setup () {
  Serial.begin(115200);

  manager.init();
  manager.web();

  camera.init();
  camera.begin();
}

void loop () {
  manager.start();
  camera.start();
}
