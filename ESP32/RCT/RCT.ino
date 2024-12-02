#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char *ssid = "DSH 1";
const char *password = "1633Diamond";

// Firestore Configuration
const String PROJECT_ID = "race-car-telemetry";
const String FIREBASE_BASE_URL = "https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/(default)/documents/";
const String RTDB_BASE_URL = "https://race-car-telemetry-default-rtdb.firebaseio.com/data/";

// Structure for CAN messages
struct CANMessage {
  uint16_t canId;
  uint8_t rawMessage[8];
  unsigned long timestamp;
};

// Simulated CAN messages
CANMessage simulatedMessages[] = {
    {100, {0x37, 0x05, 0x41, 0xC8, 0x79, 0x25, 0x3C, 0xD2}, 12345000},
    {200, {0x45, 0x12, 0x34, 0xA0, 0x56, 0x78, 0xDE, 0xF0}, 12346000}
};

const int numMessages = sizeof(simulatedMessages) / sizeof(CANMessage);

String currentConfig = ""; // Holds the current configuration name

// Global dynamic JSON buffers
DynamicJsonDocument configJson(15000);  // For configuration data
DynamicJsonDocument decodedJson(8192); // For decoded data

void setup() {
  Serial.begin(115200);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");

  // Fetch the current configuration
  while (!fetchCurrentConfig()) {
    Serial.println("Failed to fetch current configuration. Retrying...");
    delay(5000);
  }

  // Fetch the full configuration for the current config
  while (!fetchConfig()) {
    Serial.println("Failed to fetch configuration. Retrying...");
    delay(5000);
  }
}

void loop() {
  // Process each simulated CAN message
  for (int i = 0; i < numMessages; i++) {
    decodeAndSend(simulatedMessages[i]);
    delay(1000); // Optional delay between messages
  }

  delay(5000); // Delay before repeating the loop
}

// Fetch the current configuration name
bool fetchCurrentConfig() {
  String url = FIREBASE_BASE_URL + "canConfigs/currentConfig";
  // Serial.println("Fetching current configuration...");
  // Serial.println("Request URL: " + url);

  HTTPClient http;
  http.begin(url);
  int httpCode = http.GET();

  if (httpCode == HTTP_CODE_OK) {
    String payload = http.getString();
    // Serial.println("Raw currentConfig payload: " + payload);

    // Parse the JSON response
    DynamicJsonDocument doc(512); // Temporary document for the response
    auto error = deserializeJson(doc, payload);
    if (error) {
      Serial.print("JSON deserialization failed: ");
      Serial.println(error.c_str());
      http.end();
      return false;
    }

    // Extract the "current" field
    currentConfig = doc["fields"]["current"]["stringValue"].as<String>();
    Serial.println("currentConfig: " + currentConfig);
    http.end();
    return true;
  } else {
    Serial.println("Error fetching currentConfig: HTTP Code " + String(httpCode));
    http.end();
    return false;
  }
}

// Fetch the full configuration for the current config
bool fetchConfig() {
  if (currentConfig.isEmpty()) {
    Serial.println("No valid currentConfig. Skipping fetchConfig.");
    return false;
  }

  String url = FIREBASE_BASE_URL + "canConfigs/" + currentConfig;
  // Serial.println("Fetching configuration for currentConfig: " + currentConfig);
  // Serial.println("Request URL: " + url);

  HTTPClient http;
  http.begin(url);
  int httpCode = http.GET();

  if (httpCode == HTTP_CODE_OK) {
    String payload = http.getString();
    // Serial.println("Raw config payload: " + payload);

    int contentLength = payload.length();
    if (contentLength > ESP.getMaxAllocHeap() - 1024) {
      Serial.println("Payload size exceeds available memory!");
      return false;
    }

    configJson.clear();
    DeserializationError error = deserializeJson(configJson, payload, DeserializationOption::NestingLimit(20));
    if (error) {
      Serial.print("JSON deserialization failed: ");
      Serial.println(error.c_str());
      return false;
    }

    Serial.println("Parsed config successfully");
    // serializeJsonPretty(configJson, Serial);
    return true;
  } else {
    Serial.println("Error fetching configuration: HTTP Code " + String(httpCode));
    return false;
  }
}


// Extract bits from raw CAN message
uint32_t extractBits(const uint8_t *rawMessage, int startBit, int bitLength) {
  uint32_t result = 0;
  for (int i = 0; i < bitLength; i++) {
    int byteIndex = (startBit + i) / 8;
    int bitIndex = (startBit + i) % 8;
    if (rawMessage[byteIndex] & (1 << (7 - bitIndex))) {
      result |= (1 << (bitLength - 1 - i));
    }
  }
  Serial.print("Raw Message: ");
  for (int i = 0; i < 8; i++) {
    Serial.print("0x");
    Serial.print(rawMessage[i], HEX);
    Serial.print(" ");
  }
  Serial.println();
  Serial.println("Extracted Value: " + String(result));
  return result;
}


// Decode a CAN message and send the decoded data to Realtime Database
void decodeAndSend(const CANMessage &message) {
  String canIdStr = String(message.canId);

  // Find the CAN ID object in the configuration
  JsonObject canConfig = configJson["fields"][canIdStr]["mapValue"]["fields"]["DataChannels"]["mapValue"]["fields"].as<JsonObject>();

  if (!canConfig) {
    Serial.println("No DataChannels found for CAN ID: " + canIdStr);
    return;
  }

  // Clear the decoded JSON buffer
  decodedJson.clear();

  // Add the timestamp in seconds
  decodedJson["timestamp (s)"] = message.timestamp / 1000.0;

  // Decode each channel
  for (JsonPair kv : canConfig) {
    const char *channelName = kv.key().c_str();
    JsonObject channelConfig = kv.value()["mapValue"]["fields"].as<JsonObject>();

    if (!channelConfig) {
      Serial.println("Invalid channel configuration for " + String(channelName));
      continue;
    }

    // Convert string values to appropriate types
    int startBit = atoi(channelConfig["startBit"]["stringValue"].as<const char*>());
    int bitLength = atoi(channelConfig["bitLength"]["stringValue"].as<const char*>());
    float multiplier = atof(channelConfig["multiplier"]["stringValue"].as<const char*>());
    float adder = atof(channelConfig["adder"]["stringValue"].as<const char*>());
    const char *unit = channelConfig["unit"]["stringValue"].as<const char*>();

    // Extract the raw value
    uint32_t rawValue = extractBits(message.rawMessage, startBit, bitLength);

    // Apply scaling
    // float scaledValue = rawValue * multiplier + adder;
    float scaledValue = rawValue;

    // Debugging each value
    Serial.println("Channel: " + String(channelName));
    Serial.println("  Raw Value: " + String(rawValue));
    // Serial.println("  Scaled Value: " + String(scaledValue));

    // Store the decoded value with the unit
    String key = String(channelName) + " (" + unit + ")";
    decodedJson[key] = scaledValue;
  }

  // Send decoded data to Realtime Database
  String jsonString;
  serializeJson(decodedJson, jsonString);

  String url = RTDB_BASE_URL + canIdStr + ".json";
  HTTPClient http;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.PUT(jsonString);
  if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_CREATED) {
    Serial.println("Decoded data sent to Realtime Database:");
  } else {
    Serial.println("Error sending data to Realtime Database: HTTP Code " + String(httpCode));
    Serial.println(http.getString());
  }

  http.end();
}


