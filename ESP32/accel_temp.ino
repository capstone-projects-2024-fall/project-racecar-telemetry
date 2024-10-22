#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_LIS3DH.h>

Adafruit_LIS3DH lis = Adafruit_LIS3DH(); //create an instance of the LIS3DH class

void setup() {
  Serial.begin(115200); //choose rate
  
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

}

void loop() {
  lis.read(); //read the sensor data

  //get the current time in millis
  unsigned long currentTime = millis();

  //raw readings to g-forces
  float x_g = lis.x / 16384.0;      //divide by 16384 for ±2g
  float y_g = lis.y / 16384.0;
  float z_g = lis.z / 16384.0;

  //read the temperature from the internal sensor
  float temperature = temperatureRead();

  //print
  Serial.print("Time: "); Serial.print(currentTime);
  Serial.print(" ms | X: "); Serial.print(x_g);
  Serial.print(" g | Y: "); Serial.print(y_g);
  Serial.print(" g | Z: "); Serial.print(z_g);
  Serial.print(" g | Internal Temperature: "); Serial.print(temperature);
  Serial.println(" °C");


  delay(500); 
}
