#include <WiFi.h>
#include <HTTPClient.h>
// #include <CAN.h>

// Hotspot details
const char* ssid = "SSID";
const char* password = "PASSWORD";

// Firebase Database URL 
const char* firebaseHost = "https://<your-project-id>.firebaseio.com";

WiFiClient client;
HTTPClient http;

struct CAN_message {
  float timestamp;
  String can_id;
  int length;
  String data;
};

void setupCAN(){
  if(!CAN.begin(1000E3)){
    Serial.println("Couldn't start CAN!");
    while(1);
  }
  Serial.println("CAN initialized at 1 Mbps")
}

CAN_message readCANmessage(){
  CAN_message current_message;

  if(CAN.available()){
    long id = CAN.packetID();
    byte len = CAN.packetDlc();

    current_message.can_id = String(id, HEX); // CAN ID is read as int by CAN library
    current_message.length = len;
    current_message.timestamp = millis() / 1000.0;

    String data = "";
    
    
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


