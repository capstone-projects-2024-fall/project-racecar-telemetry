#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_LIS3DH.h>

Adafruit_LIS3DH lis = Adafruit_LIS3DH(); //create an instance of the LIS3DH class

void setup() {
  Serial.begin(115200); //choose rate
  
  //initialize I2C with specified SDA and SCL pins
  Wire.begin(21, 22); // SDA, SCL

  //initialize the LIS3DH accelerometer
  if (!lis.begin(0x18)) {
    Serial.println("LIS3DH not found. Check your connections.");
    while (1);    // Stop the program if the sensor is not found
  }

  Serial.println("LIS3DH connected.");

}

void loop() {
  lis.read(); //read the sensor data

  //get the current time in millis
  unsigned long currentTime = millis();

  // Print timestamp and accelerometer values
  //note z-axis is not 0 as it reads gravity apparently...
  Serial.print("Time: "); Serial.print(currentTime);
  Serial.print(" ms | X: "); Serial.print(lis.x);
  Serial.print(" | Y: "); Serial.print(lis.y);
  Serial.print(" | Z: "); Serial.println(lis.z);    

  delay(500); // Wait for half a second before the next reading
}
