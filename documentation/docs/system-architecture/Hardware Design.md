---
sidebar_position: 2
---
## Telemetry Device

The telemetry device consists of a ESP32 and Feather M4 wired to a standard automotive connector that will be plugged directly into the vehicle's wiring harness. The telemetry device also requires a mobile hotspot to be in the car while transmitting data.

Components:
* ESP-WROOM-32 DEVKITV1: ESP microcontroller (includes CAN controller but not a CAN transceiver)
* Adafruit Feather M4 CAN Express with ATSAME51
* 1100 mAh LION battery
* 120 ohm Terminal Resistor
* Mobile Hotspot

The CAN (Controller Area Network) bus is the TFR vehicle's serial communication bus, which is capable of transmitting sensor and diagnostic information from the vehicle's ECU (Engine control unit) to the telemetry device. The Adafruit Feather M4 CAN was selected for use because of its integrated CAN transceeiver and microcontroller, giving it the ability to interpret CAN frames from the car. 
An ESP32 was selected because of its WiFi capability. The feather uses i2c protocol to transmit the interpreted CAN frames to the ESP32, and the ESP32 then handles pushing the data to the Firebase realtime database.

### Connector Pinout
_A DTM04-4P: 4 pin Deutsch Connector is connected to the Telemetry Device in order to plug into the TFR vehicle._

| Color     |  Label    |  Meaning  |
| --------- | -------   | -------   |
| Black     | GND       | Connects to the vehicle's chassis ground. |
| Orange    | 5V_PWR    | 5V power supplied by vehicle's ECU (through an internal voltage regulator) |
| Yellow    | CAN_HI    | Vehicle CAN bus's CAN High wire.  |
| Green     | CAN_LO    | Vehicle CAN bus's CAN low wire.   |


### Wiring Diagram
![system diagram](/img/Telemetry-Device-Breadboard.png)

<!-- ### Electrical Schematic
![system diagram](/img/Schematic_RCT-Wiring-Diagram_2024-09-28.svg)  -->

## Hardware Testing & Integration

### RC Car
An RC car will be used to test range and data transmission from the ESP32 to the realtime database. The testing device consists of the following components:
* ESP-WROOM-32 DEVKITV1 
* 9V Battery - powers RC components and telemetry device
* 3 axis accelerometer - wired to the ESP32 (the one acting as the ECU) to provide sensor measurements to transmit live

#### Wiring Diagram
![system diagram](/img/RC-car-breadboard.png)

## Complete Hardware Requirements
<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRPmqrR1D0rSadeonzcJYDSI9_54YGbKhxfEFePVx_G_DNKT3bhswWF8M95XYecuXjWSqct2AxIOJHy/pubhtml?widget=true&headers=false" frameborder="0" width="100%" height="500"></iframe>
