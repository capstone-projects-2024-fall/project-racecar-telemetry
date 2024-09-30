#include <WiFi.h>
#include <WebSocketsClient.h>

const char* ssid = "AndroidAP_8198";
const char* password = "alohamora";
WebSocketsClient webSocket;

// Callback function that handles data received from the server
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("Disconnected from server.");
      break;
    case WStype_CONNECTED:
      Serial.println("Connected to server.");
      webSocket.sendTXT("Hello Server! ESP32 here.");
      break;
    case WStype_TEXT:
      Serial.printf("Received message: %s\n", payload);
      break;
  }
}

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);

  Serial.println("\nConnecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nConnected to WiFi.");
  Serial.print("Local IP: ");
  Serial.println(WiFi.localIP());

  // Set up WebSocket client and register event handler
  webSocket.begin("192.168.31.86", 8765, "/"); // Change "192.168.1.2" to the IP address of your computer
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  Serial.println("WE ARE HERE");
  webSocket.loop(); // Must be called to keep WebSocket connection alive

  Serial.println("1");
  if (WiFi.status() == WL_CONNECTED) {
    // Send data to WebSocket server
    String data = "hello world";
    Serial.println("2");

    webSocket.sendTXT("hi");
    Serial.println("3");
  }

 // delay(5000); // Send data every 5 seconds
}