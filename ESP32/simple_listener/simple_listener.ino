#include <Wire.h>

#define I2C_ADDRESS 8 // I2C address of the ESP32

String receivedMessage = ""; // To store the received string and bytes

void setup() {
  Serial.begin(115200);
  Wire.begin(I2C_ADDRESS); // Initialize the ESP32 as an I2C slave with address 8
  Wire.onReceive(receiveEvent); // Register receive event
  Serial.println("ESP32 I2C Slave - Ready to Receive Data");
}

void loop() {
  // Main loop can perform other tasks if needed
  delay(100);
}

// Function to handle data reception from the Feather M4
void receiveEvent(int numBytes) {
  receivedMessage = ""; // Clear previous message
  
  Serial.print("Received ");
  Serial.print(numBytes);
  Serial.println(" bytes:");

  // Read the incoming data
  if (Wire.available()) {
    byte command = Wire.read(); // Read the first byte (command byte)
    Serial.print("Command: ");
    Serial.println(command);

    // Read the string "Hello"
    for (int i = 0; i < 5 && Wire.available(); i++) {
      receivedMessage += (char)Wire.read(); // Read each character
    }
    Serial.print("Message: ");
    Serial.println(receivedMessage);

    // Read the remaining bytes (array of 3 bytes)
    Serial.print("Array Data: ");
    while (Wire.available()) {
      byte arrayByte = Wire.read();
      Serial.print(arrayByte);
      Serial.print(" ");
    }
    Serial.println();
  }
}
