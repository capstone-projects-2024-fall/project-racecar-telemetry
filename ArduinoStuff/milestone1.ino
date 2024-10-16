#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "your-SSID";
const char* password = "your-PASSWORD";

// Firebase Database URL (replace <your-project-id> with your project ID)
const char* firebaseHost = "https://<your-project-id>.firebaseio.com";

WiFiClient client;
HTTPClient http;

long lastSendTime = 0;
const long sendInterval = 500;  // Interval to send data

long lastReadTime = 0;
const long readInterval = 100;  // Interval to read CAN messages

// CAN message struct
struct Can_message {
  float timestamp;
  String can_id;
  String data;
  int length;
};

Can_message message[] = {
  { 0.100, "2B3", "00 00 03 F8 00 D3 00 06", 8 },
  { 0.200, "1A2", "FF 12 34 AB CD EF 56 78", 8 },
  { 0.300, "100", "80 00 12 34 56 78 90 AB", 8 },
  { 0.400, "2B3", "FF F8 00 02 7F FF 7F FF", 8 },
  { 0.500, "1A2", "12 34 56 78 9A BC DE F0", 8 },
  { 0.600, "2B3", "12 34 00 57 89 00 00 FF", 8 },
  { 0.700, "100", "00 00 FF FF FF FF FF FF", 8 },
  { 0.800, "1A2", "01 23 45 67 89 AB CD EF", 8 },
  { 0.900, "2B3", "FF FF 12 34 56 78 90 12", 8 },
  { 1.000, "100", "12 34 00 91 AB CD EF FF", 8 },
  { 1.100, "1A2", "AB CD EF 12 34 56 78 90", 8 },
  { 1.200, "2B3", "00 00 03 F8 00 D3 00 06", 8 },
  { 1.300, "100", "80 00 12 34 56 78 90 AB", 8 },
  { 1.400, "2B3", "FF F8 00 02 7F FF 7F FF", 8 },
  { 1.500, "1A2", "12 34 56 78 9A BC DE F0", 8 },
  { 1.600, "100", "00 00 FF FF FF FF FF FF", 8 },
  { 1.700, "2B3", "01 23 45 67 89 AB CD EF", 8 },
  { 1.800, "1A2", "FF FF 12 34 56 78 90 12", 8 },
  { 1.900, "100", "12 34 00 91 AB CD EF FF", 8 },
  { 2.000, "2B3", "AB CD EF 12 34 56 78 90", 8 },
  { 2.100, "1A2", "00 00 03 F8 00 D3 00 06", 8 },
  { 2.200, "100", "80 00 12 34 56 78 90 AB", 8 },
  { 2.300, "2B3", "FF F8 00 02 7F FF 7F FF", 8 },
  { 2.400, "1A2", "12 34 56 78 9A BC DE F0", 8 },
  { 2.500, "100", "00 00 FF FF FF FF FF FF", 8 },
  { 2.600, "1A2", "01 23 45 67 89 AB CD EF", 8 },
  { 2.700, "2B3", "FF FF 12 34 56 78 90 12", 8 },
  { 2.800, "100", "12 34 00 91 AB CD EF FF", 8 },
  { 2.900, "1A2", "AB CD EF 12 34 56 78 90", 8 },
  { 3.000, "2B3", "00 00 03 F8 00 D3 00 06", 8 },
  { 3.100, "100", "80 00 12 34 56 78 90 AB", 8 },
  { 3.200, "1A2", "FF 12 34 AB CD EF 56 78", 8 },
  { 3.300, "2B3", "FF F8 00 02 7F FF 7F FF", 8 },
  { 3.400, "100", "12 34 00 91 AB CD EF FF", 8 },
  { 3.500, "1A2", "12 34 56 78 9A BC DE F0", 8 },
  { 3.600, "2B3", "01 23 45 67 89 AB CD EF", 8 },
  { 3.700, "100", "00 00 FF FF FF FF FF FF", 8 },
  { 3.800, "1A2", "FF FF 12 34 56 78 90 12", 8 },
  { 3.900, "2B3", "AB CD EF 12 34 56 78 90", 8 },
  { 4.000, "100", "80 00 12 34 56 78 90 AB", 8 },
  { 4.100, "1A2", "12 34 56 78 9A BC DE F0", 8 },
  { 4.200, "2B3", "00 00 03 F8 00 D3 10 06", 8 },
  { 4.300, "100", "00 00 FF FF FF FF FF FF", 8 },
  { 4.400, "2B3", "FF F8 00 02 7F FF 7F FF", 8 },
  { 4.500, "1A2", "12 34 00 91 AB CD EF FF", 8 },
  { 4.600, "100", "AB CD EF 12 34 56 78 90", 8 },
  { 4.700, "2B3", "01 23 45 67 89 AB CD EF", 8 },
  { 4.800, "1A2", "00 00 03 F8 00 D3 00 06", 8 },
  { 4.900, "100", "80 00 12 34 56 78 90 AB", 8 },
  { 5.000, "2B3", "FF F8 00 02 7F FF 7F FF", 8 }
};

int i = 0;

void readNextMessage(){
  if (i < sizeof(message) / sizeof(message[0])) {  // Check if we have more messages to send
    Can_message current_message = message[i];
    
    // Create a JSON string for this message
    String jsonData = "{ \"timestamp\": " + String(current_message.timestamp, 3) + 
                      ", \"data\": \"" + current_message.data + "\" }";
    
    // Send the data to the corresponding CAN ID node in Firebase
    sendToDatabase(current_message.can_id, jsonData);
    
    i++;
  }
}

void sendToDatabase(String canId, String jsonData) {
  // Prepare the URL for the specific CAN ID
  String url = String(firebaseHost) + "/canData/" + canId + ".json";  // Data will be sent under /canData/{canId}/

  if (WiFi.status() == WL_CONNECTED) {
    http.begin(client, url);  // Specify the Firebase URL
    http.addHeader("Content-Type", "application/json");  // Set the content type to JSON

    // Send the POST request to append data
    int httpResponseCode = http.PATCH(jsonData);  // Use PATCH to append data under the same node

    if (httpResponseCode > 0) {
      Serial.println("Data sent successfully to " + canId);
      String response = http.getString();  // Get the response from the server
      Serial.println(response);
    } else {
      Serial.print("Error sending data: ");
      Serial.println(httpResponseCode);
    }

    http.end();  // End the HTTP connection
  }
}

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Attempting to connect to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");
}

void loop() {
  // Check if it's time to read the next message
  if (millis() - lastReadTime >= readInterval && i < 50) {
    readNextMessage();  // Read and send the next CAN message
    lastReadTime = millis();  // Reset the timer for the next message
  }

  // Send accumulated data every 0.5 seconds
  if (millis() - lastSendTime >= sendInterval) {
    lastSendTime = millis();  // Reset the timer for the next send
  }
}


