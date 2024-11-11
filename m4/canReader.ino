/*
 
TFR CAN Message Echo Code
*/

#include <CANSAME5x.h>
 
void rx2Tx(int CAN_ID_RX, int CAN_ID_TX);
 
CANSAME5x CAN;
 
void setup() {
  Serial.begin(115200);
  while (!Serial) delay(10);
 
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
}
 
void loop() {
 
  // Call function to echo Rotation Rates and Acceleration from the IMU's default CAN ID to one that MoTeC can read
 
  // Rotation Rates
  // Roll, Pitch, and Yaw, with 2 bytes for each in the message
  rx2Tx(0x4EC, 0x4E0);
 
  // Acceleration
  // Longitudinal, Latitudinal, and Vertical, with 2 bytes for each in the message
  rx2Tx(0x4ED, 0x4E1);
 
  delay(1);
 
}
 
void rx2Tx(int CAN_ID_RX, int CAN_ID_TX) {
 
  // Run checks for CAN message:
  //    - Check if a packet can be parsed
  //    - Check if CAN message is not RTR (Remote Request Frame)
  //    - Check if CAN is available
  if (CAN.parsePacket() && !CAN.packetRtr() && CAN.available()) {

    // Read only the specified CAN ID
    if (CAN.packetId() == CAN_ID_RX) {

      // Begin a message on the write CAN ID
      CAN.beginPacket(CAN_ID_TX);

      // Start building the serial output message with the CAN ID
      String serialMsg = "ID: " + String(CAN_ID_RX, HEX) + " Data: ";

      // Echo the message from read ID to write ID
      while (CAN.available()) {
        uint8_t dataByte = CAN.read();
        CAN.write(dataByte);                   // Write to CAN bus
        serialMsg += String(dataByte, HEX) + " "; // Append each byte in hex to serial message
      }

      // Finish and send CAN write packet
      CAN.endPacket();

      // Print the message over serial
      Serial.println(serialMsg);
    }
  }
}
 
 