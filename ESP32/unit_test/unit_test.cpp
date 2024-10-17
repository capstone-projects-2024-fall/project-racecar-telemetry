#include <iostream>
#include <cassert>

bool mockWiFiConnected;
int mockHttpResponseCode;
int accelData[3];
int testsFailed = 0;

bool mockWiFiStatus()
{
    return mockWiFiConnected;
}

int mockHttpPatch()
{
    return mockHttpResponseCode;
}


void checkEqual(int expected, int actual, const std::string& testName) {
    if (expected != actual) {
        std::cout << "Test failed: " << testName << " | Expected: " << expected << ", Got: " << actual << std::endl;
        testsFailed++;
    } else {
        std::cout << "Test passed: " << testName << std::endl;
    }
}


void readAccelerometerData() {
    accelData[0] = 500;
    accelData[1] = 600;
    accelData[2] = 700;
}

void sendToFirebase(std::string timestamp) {
    
}

void testReadAccelerometerData()
{
    readAccelerometerData();
    checkEqual(500, accelData[0], "X-Acceleration");
    checkEqual(600, accelData[1], "Y-Acceleration");
    checkEqual(700, accelData[2], "Z-Acceleration");
}

void testSendToFirebase()
{
    std::string mockTimestamp = "1234";

    mockWiFiConnected = true;
    mockHttpResponseCode = 200;

    sendToFirebase(mockTimestamp);

    checkEqual(200, mockHttpPatch(), "caught 'successful send' response code");
}

void testWifiDisconnected()
{
    std::string mockTimestamp = "1234";

    mockWiFiConnected = false;
    mockHttpResponseCode = 0; 

    sendToFirebase(mockTimestamp);

    checkEqual(0, mockHttpPatch(), "caught 'failure to send' response code");
}


int main() {
    
    testReadAccelerometerData();
    testSendToFirebase();
    testWifiDisconnected();
    
    return 0;
}
