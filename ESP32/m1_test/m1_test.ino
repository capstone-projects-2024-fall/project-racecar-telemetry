#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>

const char *ssid = "SSID";
const char *password = "PASSWD";

const char *firebaseHost = "https://<your-project-id>.firebaseio.com";
int accelData[3];

WiFiClientSecure client;
HTTPClient http;

void generateAccelerometerData()
{
    accelData[0] = random(400, 800);
    accelData[1] = random(200, 600);
    accelData[2] = random(100, 500);

    // // Debugging output
    // Serial.println("Simulated Accelerometer Data:");
    // Serial.println("X: " + String(accelData[0]));
    // Serial.println("Y: " + String(accelData[1]));
    // Serial.println("Z: " + String(accelData[2]));
}

void sendToFirebase(String timestamp)
{
    // Prepare JSON data for X, Y, Z values
    String jsonData = "{";
    jsonData += "\"X\": " + String(accelData[0]) + ",";
    jsonData += "\"Y\": " + String(accelData[1]) + ",";
    jsonData += "\"Z\": " + String(accelData[2]);
    jsonData += "}";

    String url = String(firebaseHost) + "/CANdata/001/" + timestamp + ".json";

    if (WiFi.status() == WL_CONNECTED)
    {
        // Add certification later
        client.setInsecure();
        http.begin(client, url);
        http.addHeader("Content-Type", "application/json");

        // Send JSON data using HTTP PATCH method to append to node
        int httpResponseCode = http.PATCH(jsonData);

        // Check if data was sent successfully
        if (httpResponseCode > 0)
        {
            Serial.println("Data sent to Firebase successfully!");
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
    // Initialize Serial Monitor
    Serial.begin(115200);

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to Wi-Fi...");
    }
    Serial.println("Connected to Wi-Fi");
}

void loop()
{
    // Generate simulated accelerometer data
    generateAccelerometerData();

    String timestamp = String(millis());

    sendToFirebase(timestamp);

    delay(1000);
}