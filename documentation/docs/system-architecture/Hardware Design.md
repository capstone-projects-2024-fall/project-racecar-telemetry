---
sidebar_position: 2
---
## Telemetry Device

The telemetry device consists of a microcontroller and CAN transceiver wired to a standard automotive connector that will be plugged directly into the vehicle's wiring harness. It requires the following wires to integrate with the vehicle's wiring harness:
| Color     |  Label    |  Meaning  |
| --------- | -------   | -------   |
| Red       | 12V_PWR   | 12V power supplied by the vehicle's power distribution module. |
| Black     | GND       | Connects to the vehicle's chassis ground. |
| Orange    | 5V_PWR    | 5V power supplied by vehicle's ECU (through an internal voltage regulator) |
| Yellow    | CAN_HI    | Vehicle CAN bus's CAN High wire.  |
| Green     | CAN_LO    | Vehicle CAN bus's CAN low wire.   |

Components:
* ESP-WROOM-32 DEVKITV1: ESP microcontroller (includes CAN controller but not a CAN transceiver)
* TJA1050: CAN transceiver
* DTM04-6P: 6 pin Deutsch connector

### Wiring/Breadboarding Diagram
![system diagram](/img/Telemetry-Device-Breadboard.png)

### Electrical Schematic
![system diagram](/img/Schematic_RCT-Wiring-Diagram_2024-09-28.svg) 

## Proof of Concept & Testing
The telemetry device will be tested using a small RC car to simulate the TFR vehicle. The telemetry device should be able to plug into the RC car setup exactly as it would the TFR car. This will require that a basic breadboard is constructed on the RC car, containing following components:
* ESP-WROOM-32 DEVKITV1 - In addition to the microcontroller in the telemetry device, this microcontroller acts as the as racecar's ECU, transmitting CAN messages to telemetry device. 
* TJA 1050 CAN transceiver - allows the ESP32 to transmit and receive CAN messages
* 9V Battery - powers RC components and telemetry device
* 3 axis accelerometer - wired to the ESP32 (the one acting as the ECU) to provide sensor measurements to transmit live
* DTM04-6P: 6 pin Deutsch connector, for easy connection and removal of telemetry device

### Wiring/Breadboarding Diagram
![system diagram](/img/RC-Car-Breadboard.svg)

## Complete Hardware Requirements
<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRPmqrR1D0rSadeonzcJYDSI9_54YGbKhxfEFePVx_G_DNKT3bhswWF8M95XYecuXjWSqct2AxIOJHy/pubhtml?widget=true&headers=false" frameborder="0" width="100%" height="500"></iframe>
