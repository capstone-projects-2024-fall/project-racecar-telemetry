#include <Wire.h>

void setup() {
  Wire.begin(8);          // Join the I2C bus with address 8 as a slave
  Wire.onReceive(receiveEvent); // Register the receive event callback
  Serial.begin(115200);   // Start serial communication for debugging
}

void loop() {
  // The loop does nothing in this case. The receiveEvent() function is called when data is received.
}

// Callback function executed when data is received from the master
void receiveEvent(int numBytes) {
  Serial.print("Received data: ");

  // Read and print each byte of the received data
  while (Wire.available() > 0) {
    char receivedByte = Wire.read(); // Read a byte from the I2C bus
    Serial.print(receivedByte);      // Print the byte as a character
  }

  Serial.println(); // Newline for easier readability in serial output
}
