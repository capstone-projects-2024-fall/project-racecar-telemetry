/*
 * RCT Capstone 
 * Adafruit M4 Feather CAN
 * CAN receiver/I2C transmitter code - 
 * MILESTONE DEMO 3 - gets sensor data & converts to CAN messages, transmits to ESP32 via I2C 
 */

#include <Wire.h>
#include <CANSAME5x.h>

#define ANGLE_PIN A3
#define POS1_PIN A4
#define POS2_PIN A5

CANSAME5x CAN;
unsigned long startTime;

struct SensorData {
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

void setup() {
  Serial.begin(115200);
  while (!Serial) delay(10);

  Wire.begin();  // Join the I2C bus as a master
  Serial.println("CAN Sender");

  pinMode(PIN_CAN_STANDBY, OUTPUT); 
  digitalWrite(PIN_CAN_STANDBY, false); // Turn off STANDBY
  pinMode(PIN_CAN_BOOSTEN, OUTPUT);
  digitalWrite(PIN_CAN_BOOSTEN, true); // Turn on booster

  // Start the CAN bus at 1 Mbps
  if (!CAN.begin(1000000)) {
    Serial.println("Starting CAN failed!");
    while (1) delay(10);
  }
  Serial.println("Starting CAN!");

  startTime = millis();
}

void loop() {
  Serial.println("");
  readSensors();

  CANMessage m1 = dataToCAN1(0x200);
  CANMessage m2 = dataToCAN2(0x100);

  if (!featherToESP(m1.canId, m1.timestamp, m1.hexMessage)) {
    Serial.println("Failed to send m1 via I2C.");
  }

  delay(50); // Add a delay before sending the next message

  if (!featherToESP(m2.canId, m2.timestamp, m2.hexMessage)) {
    Serial.println("Failed to send m2 via I2C.");
  }

  delay(1000); // Optional delay to facilitate speed of I2C bus
}

void readSensors() {
  s.angle = (analogRead(ANGLE_PIN) * 100) / 1023; 
  s.pos1 = (analogRead(POS1_PIN) * 3.0) / 1023;
  s.pos2 = (analogRead(POS2_PIN) * 3.0) / 1023;
  Serial.println("Angle: " + String(s.angle));
  Serial.println("Pos1: " + String(s.pos1));
  Serial.println("Pos2: " + String(s.pos2));
  s.battery = 12.5;
}

CANMessage dataToCAN1(int id) {
  CANMessage c;
  c.canId = id;
  c.timestamp = millis() - startTime;

  c.rawMessage[0] = s.angle; 
  c.hexMessage += String(c.rawMessage[0], HEX) + " ";

  float adjusted = s.battery * 10;
  c.rawMessage[1] = adjusted / 256;
  c.hexMessage += String(c.rawMessage[1], HEX) + " ";
  adjusted -= c.rawMessage[1] * 256;
  c.rawMessage[2] = adjusted;
  c.hexMessage += String(c.rawMessage[2], HEX);

  for (int i = 3; i < 8; i++) {
    c.rawMessage[i] = 0;
    c.hexMessage += " " + String(c.rawMessage[i], HEX);
  }

  Serial.println("Hex message: '" + String(c.hexMessage) + "'");
  return c;
}

CANMessage dataToCAN2(int id) {
  CANMessage c;
  c.canId = id;
  c.timestamp = millis() - startTime;

  float adjusted = s.pos1 * 100;
  c.rawMessage[0] = adjusted / 256;
  c.hexMessage += String(c.rawMessage[0], HEX) + " ";
  adjusted -= c.rawMessage[0] * 100;
  c.rawMessage[1] = adjusted;
  c.hexMessage += String(c.rawMessage[1], HEX);

  adjusted = s.pos2 * 100;
  c.rawMessage[2] = adjusted / 256;
  c.hexMessage += String(c.rawMessage[2], HEX) + " ";
  adjusted -= c.rawMessage[2] * 100;
  c.rawMessage[3] = adjusted;
  c.hexMessage += String(c.rawMessage[3], HEX);

  for (int i = 4; i < 8; i++) {
    c.rawMessage[i] = 0;
    c.hexMessage += " " + String(c.rawMessage[i], HEX);
  }

  Serial.println("Hex message: '" + String(c.hexMessage) + "'");
  return c;
}

bool featherToESP(long id, unsigned long timestamp, String data) {
  Serial.println("Beginning transmission...");

  // Convert timestamp to seconds
  unsigned long timestampSeconds = timestamp / 1000;

  // Use a character array for the message
  char message[50];
  snprintf(message, sizeof(message), "%lu %s", timestampSeconds, data.c_str());

  char finalMessage[50];
  snprintf(finalMessage, sizeof(finalMessage), "%X %s", id, message);

  Serial.print("Message is: ");
  Serial.print(finalMessage);
  Serial.print(", length = ");
  Serial.println(strlen(finalMessage));

  // Debug: Log the raw message content
  Serial.print("Final message content: ");
  for (size_t i = 0; i < strlen(finalMessage); i++) {
    Serial.print(finalMessage[i], HEX);
    Serial.print(" ");
  }
  Serial.println();

  // Check if the total message size exceeds I2C buffer
  if (strlen(finalMessage) > 32) {
    Serial.println("Error: Total I2C message size exceeds buffer limit.");
    return false;
  }

  Wire.beginTransmission(8);  // Start transmission to I2C device with address 8
  Wire.write(finalMessage);   // Send the entire message

  // Retry logic for I2C transmission with timeout
  byte error;
  unsigned long start = millis();
  for (int i = 0; i < 3; i++) { // Retry up to 3 times
    error = Wire.endTransmission();
    if (error == 0) break; // Success
    if (millis() - start > 500) { // Timeout after 500ms
      Serial.println("I2C transmission timed out.");
      return false;
    }
    Serial.println("Retry #" + String(i + 1));
    delay(10); // Short delay before retrying
  }

  if (error == 0) {
    Serial.println("Message sent: " + String(finalMessage));
    return true;
  } else {
    Serial.println("I2C transmission failed after retries. Error code: " + String(error));
    return false;
  }
}
