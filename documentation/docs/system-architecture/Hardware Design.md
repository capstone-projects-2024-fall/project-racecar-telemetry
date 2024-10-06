---
sidebar_position: 2
---
# Telemetry Device

The **telemetry device** consists of a microcontroller and CAN transceiver wired to a standard automotive connector that will be plugged directly into the vehicle's wiring harness. It requires the following wires to integrate with the vehicle's wiring harness:
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

## Wiring/Breadboarding Diagram
//![system diagram](/img/Telemetry Device Breadboard.png) 

## Electrical Schematic
![system diagram](/img/Schematic_RCT-Wiring-Diagram_2024-09-28.svg) 

# Proof of Concept & Testing
The telemetry device will be tested using a small RC car to simulate the TFR vehicle. The telemetry device should be able to plug into the RC car setup exactly as it would the TFR car. This will require that a miniature 'wiring harness' is constructed on the RC car with the following components:
* ESP32 microcontroller - acts as racecar's ECU, transmitting CAN messages to telemetry device
