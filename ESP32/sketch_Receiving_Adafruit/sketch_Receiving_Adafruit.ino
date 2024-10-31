#include <Wire.h>

void setup() {
  Wire.begin(8);                // Join the I2C bus with address 8 as a slave
  Wire.onReceive(receiveEvent); // Register receive event handler
  Serial.begin(9600);           // Start serial communication for debugging
}

void loop() {
  delay(100);                   // Small delay to keep loop running
}

// This function is called when data is received from the master
void receiveEvent(int numBytes) {
  Serial.print("Received ");
  Serial.print(numBytes);
  Serial.println(" bytes:");
  
  while (Wire.available()) {     // While data is available in the buffer
    char c = Wire.read();        // Read each byte as a character
    Serial.print("'");
    Serial.print(c);             // Print each character (or data byte) to S
    Serial.print("'");
  }

  Serial.println("");

}