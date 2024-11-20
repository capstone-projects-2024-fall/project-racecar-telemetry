#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>

// WiFi credentials
const char *ssid = "";
const char *password = "";

const char *firebaseHost = "";

WiFiClientSecure client;
HTTPClient http;

String message;

void setup() {
  Serial.begin(115200);   // Start serial communication for debugging

  // Initialize i2C comms
  Wire.begin(8);          // Join the I2C bus with address 8 as a slave
  Wire.onReceive(receiveEvent); // Register the receive event callback

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Attempting to connect to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");
}

void loop() {
  // The loop does nothing in this case. The receiveEvent() function is called when data is received.
}

// Callback function executed when data is received from the master
void receiveEvent(int numBytes) {

  String packet;

  // Read and print each byte of the received data
  while (Wire.available() > 0) {
    char c = Wire.read();  // Read a byte from the I2C bus 
    packet += c;
  }

  Serial.println(packet); // Newline for easier readability in serial output
  sendToFirebase(packet); // data is sent like "[id] [timestamp] [data]"
}

void sendToFirebase(String packet)
{ 
  // Find the positions of the spaces
  int firstSpace = packet.indexOf(' ');
  int secondSpace = packet.indexOf(' ', firstSpace + 1);

  // Extract the three parts
  String canID = packet.substring(0, firstSpace);
  String time = packet.substring(firstSpace + 1, secondSpace);
  String data = packet.substring(secondSpace + 1);

  // Extract the timestamp and data part of the string
  String jsonOutput = "{\"Time\": \"" + time + "\", \"Data\": \"" + data + "\"}";

  Serial.println("Json string: " + jsonOutput);

  String url = String(firebaseHost) + "/CANdata/" + canID + ".json";

  if (WiFi.status() == WL_CONNECTED)
  {
    // Add certification later
    client.setInsecure();
    http.begin(client, url);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.PATCH(jsonOutput);

    if (httpResponseCode > 0)
    {
      Serial.println("Data sent successfully on CAN ID " + canID);
      String response = http.getString();
      Serial.println(response);
    }
    else
    {
      Serial.print("Error sending data: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  }
  else
  {
    Serial.println("WiFi not connected");
  }
}
