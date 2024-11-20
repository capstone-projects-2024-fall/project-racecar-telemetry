/*
 * RCT Capstone 
 * Adafruit M4 Feather CAN
 * CAN receiver/i2C transmitter code
 * Receives CAN frames from TFR vehicle and transmits to ESP32 via i2C 
 */
#include <Wire.h>
#include <CANSAME5x.h>
 
CANSAME5x CAN;
unsigned long startTime;

void rx2Tx(int CAN_ID_RX, int CAN_ID_TX) ;
 
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
  //featherToESP(400, millis() - startTime, "00 00 00 00 00 00 00 00");
  //Serial.println("Attempting to send...");
  //delay(100);
    // Rotation Rates
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
      unsigned long timestamp = millis() - startTime;

      // Start building the serial output message with the timestamp & CAN ID
      String data;

      // Add all of the message to a string
      while (CAN.available()) {
        uint8_t dataByte = CAN.read();
        data += String(dataByte, HEX) + " "; // Append each byte in hex to serial message
      }

      //Serial.print(CAN.packetId()+" ");
      Serial.println(data);

      // Send String of CAN frame to ESP32
      featherToESP(CAN.packetId(), timestamp, data);
    }
  }
}

void featherToESP(long id, unsigned long timestamp, String data)
{
  Wire.beginTransmission(8);  // Start transmission to I2C device with address 8
  //String message = " { \"Time\": " + String(timestamp) + ", \"Data\": \"" + data + "\" }";

  String message = " " + String(timestamp) + " " + data; // simplifying message for i2c purposes
  Wire.write(String(id, HEX).c_str()); 
  Wire.write(message.c_str());
  Wire.endTransmission();     // Complete the transmission

  // Print the message over serial
  Serial.println(message);
}

void rx2Tx(int CAN_ID_RX, int CAN_ID_TX) {
 
  // Run checks for CAN message:
  //    - Check if a packet can be parsed
  //    - Check if CAN message is not RTR (Remote Request Frame)
  //    - Check if CAN is avaiable
  if (CAN.parsePacket() && !CAN.packetRtr() && CAN.available()) {  
   
    // Read only the specified CAN ID
    if (CAN.packetId() == CAN_ID_RX) {
     
      // begin a message on the write CAN ID
      CAN.beginPacket(CAN_ID_TX);
     
      // echo the message from read ID to write ID
      while (CAN.available()) {
        CAN.write(CAN.read());
      }
 
      // finish and send CAN write packet
      CAN.endPacket();
    }
  }

}