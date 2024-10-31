#include <Wire.h>
#include "CANSAME5x.h"

CANSAME5x CAN;

#define I2C_ADDRESS 8 // Address of the I2C slave (ESP32)

// Define CAN control pins
#define PIN_CAN_STANDBY 9    // Use the correct pin number
#define PIN_CAN_BOOSTEN 10    // Use the correct pin number

void setup() {
    Serial.begin(115200);
    while (!Serial) delay(10);

    Serial.println("CAN Sender");

    pinMode(PIN_CAN_STANDBY, OUTPUT);
    digitalWrite(PIN_CAN_STANDBY, false); // turn off STANDBY
    pinMode(PIN_CAN_BOOSTEN, OUTPUT);
    digitalWrite(PIN_CAN_BOOSTEN, true); // turn on booster

    // Start the CAN bus at 250 kbps
    if (CAN.begin(250000) != 0) {
        Serial.println("Starting CAN failed!");
        while (1) delay(10);
    }
    Serial.println("CAN bus started!");

    Wire.begin(); // Initialize I2C
}

void loop() {
    // Check for CAN messages
    if (CAN.parsePacket()) {
        long id = CAN.packetId(); // Get the ID of the received packet
        int len = CAN.packetDlc(); // Get the length of the data
        uint8_t data[8]; // Buffer for the data

        // Read the data into the buffer
        for (int i = 0; i < len; i++) {
            data[i] = CAN.read(); // Read each byte
        }

        Serial.print("Received CAN ID: ");
        Serial.println(id, HEX); // Print ID in hexadecimal format

        // Send the received message to ESP32 over I2C
        Wire.beginTransmission(I2C_ADDRESS);
        Wire.write(id & 0xFF);          // Lower byte of ID
        Wire.write((id >> 8) & 0xFF);   // Upper byte of ID
        Wire.write(len);                 // Data length

        // Send data bytes
        for (int i = 0; i < len; i++) {
            Wire.write(data[i]);
        }
        Wire.endTransmission();

        Serial.println("Message sent to ESP32");
    }

    delay(100); // Adjust delay as needed
}
