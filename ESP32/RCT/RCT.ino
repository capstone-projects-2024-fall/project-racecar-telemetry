#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <FirebaseESP32.h>

// WiFi credentials
const char *ssid = "DSH 1";
const char *password = "1633Diamond";

const char *firebaseHost = "https://race-car-telemetry-default-rtdb.firebaseio.com/";

// Firebase and WiFi objects
FirebaseData firebaseData;

DynamicJsonDocument configJson(4096);
DynamicJsonDocument translatedJson(1024);


void setup() {
  Serial.begin(115200);   // Start serial communication for debugging

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Attempting to connect to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");

    // Initialize Firebase
  Firebase.begin(FIREBASE_HOST);
  Firebase.reconnectWiFi(true);

  // Fetch configuration from Firebase
  fetchSelectedConfig();
}

void loop() {
  decodeAndSend(canId, rawCanMessage);
  delay(1000);
}

void fetchSelectedConfig() {
  String selectedConfigPath = "canConfig/currentConfig";

  // Fetch the current configuration name
  if (Firebase.getDocument(firebaseData, currentConfigPath)) {
    String selectedConfig = firebaseData.jsonObject().get("current").as<String>();
    Serial.println("Current config selected: " + selectedConfig);

    // Fetch the selected Configuration
    fetchConfig(selectedConfig);
  } else {
    Serial.println("Failed to fetch currentConfig: " + firebaseData.errorReason());
  }
}

void fetchConfig(String configName) {
  String configPath = "canConfig/" + configName;

  if (Firebase.getDocument(firebaseData, configPath)) {
    Serial.println("Fetched configuration:");
    Serial.println(firebaseData.jsonObject().toString());
    deserializeJson(configJson, firebaseData.jsonObject().toString());
  } else {
    Serial.println("Failed to fetch configuration: " + firebaseData.errorReason());
  }
}

uint32_t extractBits(uint8_t rawCanMessage[8], int startBit, int bitLength) {
  uint32_t data = 0;

  for (int i = 0; i < bitLength; i++) {
    int byteIndex = (startBit + i) / 8;
    int bitIndex = (startBit + i) % 8;

    // Extract bit and set it in the correct position
    if (rawCanMessage[byteIndex] & (1 << (7 - bitIndex))) {
      data |= (1 << (bitLength - 1 - i));
    }
  }

  return data;
}

void decodeAndSend(uint16_t canId, uint8_t rawCanMessage[8]) {
  // Look up configuration for this CAN ID
  String canIdKey = String(canId);
  if (!configJson.containsKey(canIdKey)) {
    Serial.println("CAN ID not found in config");
    return;
  }

  JsonObject config = configJson[canIdKey].as<JsonObject>();

  // Clear previous translated data
  translatedJson.clear();

  // Decode each channel
  for (JsonPair kv : config) {
    const char* channel = kv.key().c_str();
    int startBit = kv.value()["startBit"];
    int bitLength = kv.value()["bitLength"];

    // Extract bits
    uint32_t data = extractBits(rawCanMessage, startBit, bitLength);

    // Store translated value in JSON
    translatedJson[channel] = data;
  }
