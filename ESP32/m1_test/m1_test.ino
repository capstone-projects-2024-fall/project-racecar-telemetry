#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>

#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_LIS3DH.h>

Adafruit_LIS3DH lis = Adafruit_LIS3DH(); //create an instance of the LIS3DH class

const char *ssid = "";
const char *password = "";

const char *firebaseHost = "";

//int accelPins[3] = {34, 35, 32};
//int accelData[3];

WiFiClientSecure client;
HTTPClient http;

// struct dataObj
// {
//   int data;
//   String name;
//   int pin;
// };

//struct dataObj accelData[3];

float x_g;
float y_g;
float z_g;
float temperature;

void generateAccelerometerData()
{
  lis.read(); //read the sensor data
  //get the current time in millis
  unsigned long currentTime = millis();
  
  //raw readings to g-forces
  x_g = lis.x / 16384.0;      //divide by 16384 for ±2g
  y_g = lis.y / 16384.0;
  z_g = lis.z / 16384.0;

  //read the temperature from the internal sensor
  temperature = temperatureRead();

  //for (int i = 0; i < 3; i++)
  //{
  //  accelData[i] = analogRead(accelPins[i]);
  //}

    // // Debugging output
    //z is height
    Serial.println("Simulated Accelerometer Data:");
    Serial.println("X: " + String(x_g));     
    Serial.println("Y: " + String(y_g));
    Serial.println("Z: " + String(z_g));
    Serial.println("Temp: " + String(temperature));
}

void sendToFirebase(String timestamp)
{
    // Prepare JSON data for X, Y, Z values
    String jsonData = "{";
    jsonData += "\"Time\": " + String(timestamp) + ",";
    jsonData += "\"X\": " + String(x_g) + ",";
    jsonData += "\"Y\": " + String(y_g) + ",";
    jsonData += "\"Z\": " + String(z_g) + ",";
    jsonData += "\"Temp\": " + String(temperature);
    jsonData += "}";

    String url = String(firebaseHost) + "/CANdata/001/.json";

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

  //accelData[0] = 34;
  //accelData[1] = 35;
  //accelData[2] = 32;

  //initialize I2C with specified SDA and SCL pins
  Wire.begin(21, 22); // SDA, SCL

  //initialize the LIS3DH accelerometer
  if (!lis.begin(0x18)) {
    Serial.println("LIS3DH not found. Check your connections.");
    while (1);    // Stop the program if the sensor is not found
  }

  // Set the range to ±2g (you can change this to any desired range)
  lis.setRange(LIS3DH_RANGE_2_G);


  Serial.println("LIS3DH connected.");

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