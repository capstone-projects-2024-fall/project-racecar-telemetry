#include <WiFi.h>
#include <HTTPClient.h>

// WiFi credentials
const char* ssid = "SSID";
const char* password = "PASSWORD";

const char* firebaseHost = "https://<your-project-id>.firebaseio.com";

// define the pins for accelereter in {X, Y, Z}
int accelPins[3] = {34, 35, 32};

// array to hold accelerometer data
int accelData[3]; 

String accelDataLabels[] = {"Y-Acceleration", "X-Acceleration", "Z-Acceleration"};

WiFiClient client;
HTTPClient http;

void readAccelerometerData() {
  for (int i = 0; i < 3; i++) {
    // read data from pins
    accelData[i] = analogRead(accelPins[i]);  

    // debugging print statement
    Serial.println(accelDataLabels[i] + ": " + String(accelData[i])); 
  }
}

void sendToFirebase(String timestamp){
  String jsonData = "{";
  
  for (int i = 0; i < 3; i++){
    jsonData += "\"" + accelDataLabels[1] + "\": " + String(accelData[i]);

    // adds a comma between each entry 
    if (i < 2){
      jsonData += ",";
    }
  }

  jsonData += "}";

  String url = string(firebaseHost) + "/CANdata/" + timestamp + ".json";
  
  if (WiFi.status() == WL_CONNECTED) {
    http.begin(client, url);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.PATCH(jsonData);

    if (httpResponseCode > 0) {
      Serial.println("Data sent successfully at timestamp: " + timestamp);
      String response = http.getString(); 
      Serial.println(response);
    } else {
      Serial.print("Error sending data: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  }else {
    Serial.println("WiFi not connected");
  }
}

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Attempting to connect to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");
}

void loop() {
  // Read the accelerometer data
  readAccelerometerData();

  // Generate a timestamp using millis()
  String timestamp = String(millis() / 1000.0);  // Convert millis to seconds, 3 decimal places

  // Send the accelerometer data to Firebase
  sendToFirebase(timestamp);

  // Wait for a while before reading data again (e.g., every second)
  delay(0.1);  // Adjust the delay as needed
}

















