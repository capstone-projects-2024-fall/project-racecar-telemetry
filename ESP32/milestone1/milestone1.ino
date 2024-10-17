#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>

// WiFi credentials
const char *ssid = "SSID";
const char *password = "PASSWORD";

const char *firebaseHost = "https://<your-project-id>.firebaseio.com";

// define the pins for accelereter in {X, Y, Z}
int accelPins[3] = {34, 35, 32};

// array to hold accelerometer data
int accelData[3];

String accelDataLabels[] = {"X", "Y", "Z"};

WiFiClientSecure client;
HTTPClient http;

void readAccelerometerData()
{
  for (int i = 0; i < 3; i++)
  {
    accelData[i] = analogRead(accelPins[i]);

    // // debugging print statement
    // Serial.println(accelDataLabels[i] + ": " + String(accelData[i]));
  }
}

void sendToFirebase(String timestamp)
{
  String jsonData = "{";
  jsonData += "\"X\": " + String(accelData[0]) + ",";
  jsonData += "\"Y\": " + String(accelData[1]) + ",";
  jsonData += "\"Z\": " + String(accelData[2]);
  jsonData += "}";

  String url = String(firebaseHost) + "/CANdata/" + "001/" + timestamp + ".json";

  if (WiFi.status() == WL_CONNECTED)
  {
    // Add certification later
    client.setInsecure();
    http.begin(client, url);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.PATCH(jsonData);

    if (httpResponseCode > 0)
    {
      Serial.println("Data sent successfully at timestamp: " + timestamp);
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

void setup()
{
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Attempting to connect to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");
}

void loop()
{
  // Read the accelerometer data
  readAccelerometerData();

  String timestamp = String(millis());

  sendToFirebase(timestamp);

  delay(0.1);
}
