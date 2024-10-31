#include <Wire.h>

#define I2C_ADDRESS 8 // Address of the I2C slave (matching the sender)

void setup() {
    Serial.begin(115200);
    Wire.begin(I2C_ADDRESS); // Start I2C with the defined address
    Wire.onReceive(receiveEvent); // Register event handler for received data
    Serial.println("I2C Listener Ready");
}

void loop() {
    // Main loop can perform other tasks
    delay(100);
}

// Function to handle data reception
void receiveEvent(int numBytes) {
    Serial.print("Received ");
    Serial.print(numBytes);
    Serial.println(" bytes:");

    // Read the incoming data
    while (Wire.available()) {
        // Read the CAN ID (two bytes)
        uint8_t lowByte = Wire.read();  // Lower byte of ID
        uint8_t highByte = Wire.read(); // Upper byte of ID
        long id = (highByte << 8) | lowByte; // Combine bytes into an ID

        // Read the data length
        uint8_t len = Wire.read();

        Serial.print("CAN ID: ");
        Serial.println(id, HEX); // Print ID in hexadecimal format
        Serial.print("Data Length: ");
        Serial.println(len);

        // Read the data bytes
        for (int i = 0; i < len; i++) {
            if (Wire.available()) {
                uint8_t dataByte = Wire.read();
                Serial.print("Data Byte ");
                Serial.print(i);
                Serial.print(": ");
                Serial.println(dataByte, HEX);
            }
        }
    }
}
