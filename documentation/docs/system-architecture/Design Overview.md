---
sidebar_position: 1
---

![system diagram](/img/system_block_diagram.png)  
**Figure 1.** High level design of the RCT

The overall design is best understood through following a single piece of data from when a signal is produced by a sensor to when the user sees a number on the webpage. The data must be translated through various forms over multiple devices and the cloud before it reaches the user. 

This example will show how Throttle Position would be transmitted from the car to the webpage. Steps 1 and 2a are NOT a part of this project specifically since it already exists in the TFR car. It is shown here to complete the understanding of the data involved.

1. **Rotary potentiometer** mounted to the throttle body captures an **analog voltage signal** of **2.5** that changes as the throttle valve is opened or closed. The analog signal is transmitted to the ECU with a wire.
2. **Engine Control Unit (ECU)**: 
    - uses a calibration table to transform the analog signal from a voltage into a **percentage**, where 0% is fully closed throttle and 100% is wide open. The transformation results in a reading of **50%** throttle. 
    - is configured by the TFR team to transmit Throttle Position using a **CAN message**
        - Team will choose a CAN ID between 0x200 and 0x300 (for the purposes of this project, to simplify filtering relevant CAN messages in telemetry device code). In this example, the team selects ID **0x230**.
        - Team chooses how often the message will be transmitted. For this example, they choose 10 Hz.
        - Every CAN message has 64 bits available to transmit data, and the team can determine how the message will be sent by specifying start bit, bit length, multiplier, and adder. The team chooses the following options:
            - Start bit: 0
            - Bit length: 16
            - Adder: 0
            - Multiplier: 1
        - These settings result in the CAN message below. In reality, more of the 64 bits can be utilized. 
        - The ECU's internal circuitry converts this CAN message into a **differential voltage signal** and transmits that signal over the CAN bus.


| Timestamp     | CAN ID    | Length    | Message    |
| ------        | -------   | --------- | --------  |   
| 13.45436      | 0x230     | 8         | 32 00 00 00 00 00 00 00 |


3. **CAN transceiver** - In the telemetry device, the CAN transceiver is wired to the CAN bus. It converts the differential voltage signal into frames of **serial data** containing the CAN messages.
4. **Microcontroller** - Telemetry device also contains a microcontroller which:
    - Receives all of the CAN bus messages coming through the transceiver
    - Filters CAN messages by looking for CAN IDs between 0x200-0x300.
    - Gathers data from 0.5 second intervals into **JSON objects**.
    - Connects to Mobile Hotspot for internet access. Uploads JSON objects to Firebase cloud database.
5. **Mobile hotspot** - Hotspot enables Telemetry device to connect to internet.
6. **Firebase Realtime Database** - Receives and stores JSON data from ESP32.
7. **Firebase hosting** - Hosts the TFR telemetry website.
8. **Telemetry webapp** - Retreives JSON data from firebase.
    - Since the Firebase JSON data is only timestamps, CAN IDs, and the message, the webpage needs the user to specify how the data was transmitted from the ECU so that it can translate the CAN messages into meaningful data.
    - The CAN Configuration page allows the user to enter the following information so that the webapp can 'decode' CAN messages (this example is for Throttle Position):
        - Data Channel (String): "Throttle Position"
        - CAN ID (Hex number): 0x230
        - Message Length (bits): 16
        - Message offset (bits): 0
        - Adder (int): 0
        - Multiplier (int): 1
        - Unit (String): "%"
    - With this information, the CAN message "32 00 00 00 00 00 00 00" is decoded to Throttle Position (as a %) = 50 (32 in Hex is 50 in decimal).
9. **Displays** - Now that sensor data is fully decoded, it can be displayed as either a number, a point on a time-series graph, or a gauge on the webapp.


<!-- 
{
    "data_points": [
        {
            "can_id": "4EC"
            "data": "32 00 00 00 00 00 00 00"
            "timestamp": 13.5
        }
        {
            "can_id": "4EC"
            "data": "35 00 00 00 00 00 00 00"
            "timestamp": 13.6
        }        
        {
            "can_id": "4EC"
            "data": "38 00 00 00 00 00 00 00"
            "timestamp": 13.7
        }        
        {
            "can_id": "4EC"
            "data": "34 00 00 00 00 00 00 00"
            "timestamp": 13.8
        }
        {
            "can_id": "4EC"
            "data": "34 00 00 00 00 00 00 00"
            "timestamp": 13.9
        }
    ]
}

''' -->