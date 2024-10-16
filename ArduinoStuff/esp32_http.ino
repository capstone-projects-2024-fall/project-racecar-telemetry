#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "";
const char* password = "";

// Firebase Database URL, API key if used
const char* firebaseHost = "https://<your-project-id>.firebaseio.com";
// const char* firebaseAuth = "YOUR_FIREBASE_SECRET_KEY";

// // python test server
// const char* serverHost = "YOUR_SERVER_ENDPOINT";

WiFiClient client;
HTTPClient http;

long lastSendTime = 0;
const long sendInterval = 500;

long lastReadTime = 0;
const long readInterval = 100;

// CAN bus data variable to dynamically add to the JSON object as new data point
String data_points = "";

// accel pin
int accelPins[3] = {34, 35, 32};
int accelData[3];
String accelDataLabels[] = {"Y-Acceleration", "X-Acceleration", "Z-Acceleration"};


struct Can_message {
  float timestamp;
  String can_id;
  String data;
  int length;
};

// Sample CAN data over 5 seconds (total 50 messages)
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

int i = 0; // what is i?
void readNextMessage(){
  if (i < 50) {
    Can_message current_message = message[i];
    data_points += "{ \"can_id\": \"" + current_message.can_id + "\", \"data\": \"" + current_message.data + "\", \"timestamp\": " + String(current_message.timestamp, 3) + " },";
    i++;
  }
}

void sendToDatabase(){
  // Remove the trailing comma from the data_points string
  if (data_points.endsWith(",")) {
    data_points.remove(data_points.length() - 1);
  }

  // Build the JSON object
  String jsonData = "{ \"data_points\": [" + data_points + "] }";

  // Prepare the HTTP request w/ auth
  // String url = String(firebaseHost) + "/canBusData.json?auth=" + firebaseAuth;
  // WIthout Auth
  String url = String(firebaseHost) + "/canBusData.json";

  if (WiFi.status() == WL_CONNECTED) {

    http.begin(client, serverHost);
    http.addHeader("Content-Type", "application/json");

    // Send the POST request
    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
      Serial.println("Data sent to successfully.");
      String response = http.getString();
      Serial.println(response);
    } else {
      Serial.print("Error sending data: ");
      Serial.println(httpResponseCode);
    }

    http.end();  
  }

  // Clear the data points for the next aggregation
  data_points = "";
}


void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED){
    delay(1000);
    Serial.println("Attempting to connect to Wifi...");
  }

  Serial.println("Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  for (int i = 0; i < 3; i++)
  {
    accelData[i] = analogRead(accelPin[i]);
    Serial.println(accelDataLabels[i] + accelData[i]);
  }

  if (millis() - lastReadTime >= readInterval && i < 50) {
    readNextMessage();
    lastReadTime = millis();  // Reset the timer for next 0.1-second read
  }

  // Send accumulated data every 0.5 seconds, even if there are fewer than 50 messages collected
  if (millis() - lastSendTime >= sendInterval) {
    if (data_points.length() > 0) {  // Only send if there's data to send
      sendToDatabase();
    }
    lastSendTime = millis();  // Reset the timer for the next 0.5-second send
  }
}

