#include <Wire.h>

void setup() {
  Wire.begin();          // Join the I2C bus as a master
  Serial.begin(115200);    // Begin serial communication for debugging
}

void loop() {
  Wire.beginTransmission(8);  // Start transmission to I2C device with address 8

  Wire.write(42);             // Send a single byte (for example, a command)
  Wire.write("Hello");        // Send a string of characters

  byte arrayData[3] = {10, 20, 30}; // Array of bytes to send
  Wire.write(arrayData, 3);   // Send multiple bytes from an array

  Wire.endTransmission();     // Complete the transmission

  delay(1000);                // Wait for 1 second
}