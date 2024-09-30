#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "AndroidAP_8198";  // Your WiFi SSID
const char* password = "alohamora";  // Your WiFi password

void setup() {
  Serial.begin(9600);  // Start the Serial communication

  // Connect to WiFi
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Send a GET request to confirm functionality
  sendHttpRequest();
}

void loop() {
  // Put code here if you need to repeat the HTTP request or other functionality
  delay(1000);
  //Serial.println(WiFi.localIP());
  sendHttpRequest();

}

void sendHttpRequest() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Specify the URL for the GET request
    http.begin("http://httpbin.org/get");  // You can replace this with another URL or your server

    Serial.println("Sending GET request...");

    // Send the GET request
    int httpResponseCode = http.GET();

    // Check the HTTP response code
    if (httpResponseCode > 0) {
      Serial.print("Response code: ");
      Serial.println(httpResponseCode);
      
      // Get the response payload
      String payload = http.getString();
      Serial.println("Response payload:");
      Serial.println(payload);
    } else {
      Serial.print("Error in sending GET request. HTTP error code: ");
      Serial.println(httpResponseCode);
    }

    // End the HTTP connection
    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}