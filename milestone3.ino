/*
 * RCT Capstone 
 * Adafruit M4 Feather CAN
 * CAN receiver/i2C transmitter code - 
 * MILESTONE DEMO 3 - gets sensor data & converts to CAN messages, transmits to ESP32 via i2C 
 * Using 
 */

#include <Wire.h>
#include <CANSAME5x.h>

#define ANGLE_PIN A3 // todo
#define POS1_PIN A4
#define POS2_PIN A5
//#define TEMP_PIN 4 //todo
 
CANSAME5x CAN;
unsigned long startTime;

struct SensorData{
  float angle;
  float pos1;
  float pos2;
  float battery;
};

SensorData s;

struct CANMessage {
  uint16_t canId;
  uint8_t rawMessage[8];
  String hexMessage;
  unsigned long timestamp;
};

CANMessage m;

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
  // put your main code here, to run repeatedly:
  //Serial.println("");
  //readSensors();
  //Serial.println("");

  //CANMessage m1 = dataToCAN1(0x200);
  //CANMessage m2 = dataToCAN2(0x100);

  //featherToESP(m1.canId, m1.timestamp, m1.hexMessage);
  //featherToESP(m2.canId, m2.timestamp, m2.hexMessage);

  if (millis() - startTime > 60000)
  {
    NVIC_SystemReset(); 
  }
  parseCAN(0x100, 0x210);
  //sdelay(100); // optional delay to facilitate speed of i2c bus
}

void readSensors()
{
  s.angle = (analogRead(ANGLE_PIN) * 100) / 1023; 
  s.pos1 = (analogRead(POS1_PIN) * 3.0) / 1023;
  s.pos2 = (analogRead(POS2_PIN) * 3.0) / 1023;
  Serial.println("Angle: " + String(s.angle));
  Serial.println("Pos1: " + String(s.pos1));
  Serial.println("Pos2: " + String(s.pos2));
  s.battery = 12.5;
}

CANMessage dataToCAN1(int id)
{
  CANMessage c;
  c.canId = id;
  c.timestamp = millis() - startTime;

  // putting throttle position as byte 0
  c.rawMessage[0] = s.angle; 
  c.hexMessage += String(c.rawMessage[0], HEX) + " ";

  // putting battery voltage as byte 1 & 2
  float adjusted = s.battery * 10;
  c.rawMessage[1] = adjusted / 256; // doing manual decimal to byte conversion, this is probably unnecessary
  c.hexMessage += String(c.rawMessage[1], HEX) + " ";
  adjusted -= c.rawMessage[1]*256;
  c.rawMessage[2] = adjusted;
  c.hexMessage += String(c.rawMessage[2], HEX);


  for (int i = 3; i < 8; i++)
  {
    c.rawMessage[i] = 0;
    c.hexMessage += " " + String(c.rawMessage[i], HEX);
  }

  if (0) // for debugging
  {
    for (int i = 0; i < 8; i++)
    {
      Serial.print(c.rawMessage[i] + " ");
    }
    Serial.println("");
  }

  Serial.println("Hex message: '" + String(c.hexMessage)+"'");

   return c;
}

CANMessage dataToCAN2(int id)
{
  CANMessage c;
  c.canId = id;
  c.timestamp = millis() - startTime;

  float adjusted = s.pos1 * 100;
  c.rawMessage[0] = adjusted / 256; // doing manual decimal to byte conversion, this is probably unnecessary
  c.hexMessage += String(c.rawMessage[0], HEX) + " ";
  adjusted -= c.rawMessage[0]*100;
  c.rawMessage[1] = adjusted;
  c.hexMessage += String(c.rawMessage[1], HEX);

  adjusted = s.pos2 * 100;
  c.rawMessage[2] = adjusted / 256; // doing manual decimal to byte conversion, this is probably unnecessary
  c.hexMessage += String(c.rawMessage[2], HEX) + " ";
  adjusted -= c.rawMessage[2]*100;
  c.rawMessage[3] = adjusted;
  c.hexMessage += String(c.rawMessage[3], HEX);

  for (int i = 4; i < 8; i++)
  {
    c.rawMessage[i] = 0;
    c.hexMessage += " " + String(c.rawMessage[i], HEX);
  }

  Serial.println("Hex message: '" + String(c.hexMessage)+"'");

   return c;
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
  Serial.println("Beginning transmission...");
  Wire.beginTransmission(8);  // Start transmission to I2C device with address 8

  Wire.write(String(id, HEX).c_str()); 
  String message = " " + String(timestamp) + " " + data; // simplifying message for i2c purposes
  Serial.println("sent first part");

  Wire.write(message.c_str());
  Serial.println("sent second part");

  if(Wire.endTransmission() != 0){
    NVIC_SystemReset(); 
  }     // Complete the transmission


  //Serial.println("error: " + String(error));

  // if (error != 0)
  // {
  //   setup();
  // }
  // Print the message over serial
  Serial.println("Message: " + String(id, HEX) + message);

  long startMillis = millis();
  
  while (millis() - startMillis < 1000) {
    // Do nothing, but allow other operations to continue if necessary
  }
  // delay(100);
  // delay(1000) & delay(0), failed. need delay.
}
