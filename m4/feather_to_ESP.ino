/*
 * RCT Capstone 
 * Adafruit M4 Feather CAN
 * CAN receiver/i2C transmitter code
 * Receives CAN frames from TFR vehicle and transmits to ESP32 via i2C 
 */
#include <Wire.h>
#include <CANSAME5x.h>
 
void parseCAN(int minCANID, int maxCANID);
void featherToESP(String message);
 
CANSAME5x CAN;
unsigned long startTime;
 
void setup() {
  Serial.begin(115200);
  while (!Serial) delay(10);

  Wire.begin();  // Join the I2C bus as a master
 
  Serial.println("CAN Sender");
 
  pinMode(PIN_CAN_STANDBY, OUTPUT);
  digitalWrite(PIN_CAN_STANDBY, false); // turn off STANDBY
  pinMode(PIN_CAN_BOOSTEN, OUTPUT);
  digitalWrite(PIN_CAN_BOOSTEN, true); // turn on booster
 
  // start the CAN bus at 1 Mbps
  if (!CAN.begin(1000000)) {
    Serial.println("Starting CAN failed!");
    while (1) delay(10);
  }
  Serial.println("Starting CAN!");

  startTime = millis();
}
 
void loop() {
  parseCAN(0x200, 0x300); // specifying range of can IDs to scan for
}
 
void parseCAN(int minCANID, int maxCANID) {
 
  // Run checks for CAN message:
  //    - Check if a packet can be parsed
  //    - Check if CAN message is not RTR (Remote Request Frame)
  //    - Check if CAN is avaiable
  if (CAN.parsePacket() && !CAN.packetRtr() && CAN.available()) {  
    
    // Only parse the message if it's within a certain range of CAN IDs
    if (CAN.packetId() > minCANID && CAN.packetId() < maxCANID) {
      
      // get current time in milliseconds
      unsigned long currentTime = millis() - startTime;

      // Start building the serial output message with the timestamp & CAN ID
      String serialMsg = "Time: " + String(currentTime) + " ID: " + String(CAN.packetId(), HEX) + " Data: ";

      // Add all of the message to a string
      while (CAN.available()) {
        uint8_t dataByte = CAN.read();
        serialMsg += String(dataByte, HEX) + " "; // Append each byte in hex to serial message
      }

      // Send String of CAN frame to ESP32
      featherToESP(serialMsg);

      // Print the message over serial
      Serial.println(serialMsg);
    }
  }
}

void featherToESP(String message)
{
  Wire.beginTransmission(8);  // Start transmission to I2C device with address 8
  Wire.write(message.c_str()); 
  Wire.endTransmission();     // Complete the transmission
}